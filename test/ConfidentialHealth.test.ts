import { expect } from "chai";
import { ethers } from "hardhat";
import { ConfidentialHealth } from "../typechain-types";

describe("ConfidentialHealth", function () {
  let confidentialHealth: ConfidentialHealth;
  let owner: any;
  let user1: any;
  let user2: any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const ConfidentialHealth = await ethers.getContractFactory("ConfidentialHealth");
    confidentialHealth = await ConfidentialHealth.deploy();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await confidentialHealth.getAddress()).to.be.properAddress;
    });
  });

  describe("Health Data Management", function () {
    it("Should upload health data successfully", async function () {
      const dataHash = "QmHash123456789";
      const encryptedScore = ethers.parseUnits("85", 0); // Mock encrypted score
      const encryptedRisk = ethers.parseUnits("2", 0);   // Mock encrypted risk
      const encryptedAge = ethers.parseUnits("3", 0);    // Mock encrypted age group

      await confidentialHealth.connect(user1).uploadHealthData(
        dataHash,
        encryptedScore,
        encryptedRisk,
        encryptedAge
      );

      const healthData = await confidentialHealth.getUserHealthData(user1.address);
      expect(healthData[0]).to.equal(dataHash);
      expect(healthData[1]).to.be.gt(0); // timestamp
      expect(healthData[2]).to.equal(user1.address);
      expect(healthData[3]).to.be.true; // isActive
    });

    it("Should fail to upload with empty data hash", async function () {
      const encryptedScore = ethers.parseUnits("85", 0);
      const encryptedRisk = ethers.parseUnits("2", 0);
      const encryptedAge = ethers.parseUnits("3", 0);

      await expect(
        confidentialHealth.connect(user1).uploadHealthData(
          "",
          encryptedScore,
          encryptedRisk,
          encryptedAge
        )
      ).to.be.revertedWith("Data hash cannot be empty");
    });

    it("Should update health data successfully", async function () {
      // First upload data
      const dataHash1 = "QmHash123456789";
      const encryptedScore1 = ethers.parseUnits("85", 0);
      const encryptedRisk1 = ethers.parseUnits("2", 0);
      const encryptedAge1 = ethers.parseUnits("3", 0);

      await confidentialHealth.connect(user1).uploadHealthData(
        dataHash1,
        encryptedScore1,
        encryptedRisk1,
        encryptedAge1
      );

      // Then update data
      const dataHash2 = "QmHash987654321";
      const encryptedScore2 = ethers.parseUnits("90", 0);
      const encryptedRisk2 = ethers.parseUnits("1", 0);
      const encryptedAge2 = ethers.parseUnits("3", 0);

      await confidentialHealth.connect(user1).updateHealthData(
        dataHash2,
        encryptedScore2,
        encryptedRisk2,
        encryptedAge2
      );

      const healthData = await confidentialHealth.getUserHealthData(user1.address);
      expect(healthData[0]).to.equal(dataHash2);
    });

    it("Should fail to update without existing data", async function () {
      const dataHash = "QmHash123456789";
      const encryptedScore = ethers.parseUnits("85", 0);
      const encryptedRisk = ethers.parseUnits("2", 0);
      const encryptedAge = ethers.parseUnits("3", 0);

      await expect(
        confidentialHealth.connect(user1).updateHealthData(
          dataHash,
          encryptedScore,
          encryptedRisk,
          encryptedAge
        )
      ).to.be.revertedWith("No health data uploaded");
    });
  });

  describe("Permission Management", function () {
    beforeEach(async function () {
      const dataHash = "QmHash123456789";
      const encryptedScore = ethers.parseUnits("85", 0);
      const encryptedRisk = ethers.parseUnits("2", 0);
      const encryptedAge = ethers.parseUnits("3", 0);

      await confidentialHealth.connect(user1).uploadHealthData(
        dataHash,
        encryptedScore,
        encryptedRisk,
        encryptedAge
      );
    });

    it("Should grant sharing permission successfully", async function () {
      await confidentialHealth.connect(user1).grantSharingPermission(user2.address);

      const hasPermission = await confidentialHealth.hasSharingPermission(user1.address, user2.address);
      expect(hasPermission).to.be.true;
    });

    it("Should fail to grant permission to self", async function () {
      await expect(
        confidentialHealth.connect(user1).grantSharingPermission(user1.address)
      ).to.be.revertedWith("Cannot grant permission to self");
    });

    it("Should fail to grant permission to zero address", async function () {
      await expect(
        confidentialHealth.connect(user1).grantSharingPermission(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid recipient address");
    });

    it("Should fail to grant permission without health data", async function () {
      await expect(
        confidentialHealth.connect(user2).grantSharingPermission(user1.address)
      ).to.be.revertedWith("No health data uploaded");
    });

    it("Should revoke sharing permission successfully", async function () {
      // First grant permission
      await confidentialHealth.connect(user1).grantSharingPermission(user2.address);
      
      // Then revoke it
      await confidentialHealth.connect(user1).revokeSharingPermission(user2.address);

      const hasPermission = await confidentialHealth.hasSharingPermission(user1.address, user2.address);
      expect(hasPermission).to.be.false;
    });
  });

  describe("Data Sharing", function () {
    beforeEach(async function () {
      const dataHash = "QmHash123456789";
      const encryptedScore = ethers.parseUnits("85", 0);
      const encryptedRisk = ethers.parseUnits("2", 0);
      const encryptedAge = ethers.parseUnits("3", 0);

      await confidentialHealth.connect(user1).uploadHealthData(
        dataHash,
        encryptedScore,
        encryptedRisk,
        encryptedAge
      );

      await confidentialHealth.connect(user1).grantSharingPermission(user2.address);
    });

    it("Should share health score with permitted user", async function () {
      const sharedScore = await confidentialHealth.connect(user2).shareHealthScore(user1.address);
      expect(sharedScore).to.equal(ethers.parseUnits("85", 0));
    });

    it("Should share risk factor with permitted user", async function () {
      const sharedRisk = await confidentialHealth.connect(user2).shareRiskFactor(user1.address);
      expect(sharedRisk).to.equal(ethers.parseUnits("2", 0));
    });

    it("Should share age group with permitted user", async function () {
      const sharedAge = await confidentialHealth.connect(user2).shareAgeGroup(user1.address);
      expect(sharedAge).to.equal(ethers.parseUnits("3", 0));
    });

    it("Should fail to share data without permission", async function () {
      await expect(
        confidentialHealth.connect(user2).shareHealthScore(owner.address)
      ).to.be.revertedWith("No sharing permission");
    });

    it("Should fail to share data from inactive user", async function () {
      // Deactivate user1's data
      await confidentialHealth.connect(user1).deactivateHealthData();

      await expect(
        confidentialHealth.connect(user2).shareHealthScore(user1.address)
      ).to.be.revertedWith("Health data not available");
    });
  });

  describe("Data Retrieval", function () {
    beforeEach(async function () {
      const dataHash = "QmHash123456789";
      const encryptedScore = ethers.parseUnits("85", 0);
      const encryptedRisk = ethers.parseUnits("2", 0);
      const encryptedAge = ethers.parseUnits("3", 0);

      await confidentialHealth.connect(user1).uploadHealthData(
        dataHash,
        encryptedScore,
        encryptedRisk,
        encryptedAge
      );
    });

    it("Should get user's own health score", async function () {
      const score = await confidentialHealth.connect(user1).getMyHealthScore();
      expect(score).to.equal(ethers.parseUnits("85", 0));
    });

    it("Should get user's own risk factor", async function () {
      const risk = await confidentialHealth.connect(user1).getMyRiskFactor();
      expect(risk).to.equal(ethers.parseUnits("2", 0));
    });

    it("Should get user's own age group", async function () {
      const age = await confidentialHealth.connect(user1).getMyAgeGroup();
      expect(age).to.equal(ethers.parseUnits("3", 0));
    });

    it("Should fail to get data without uploading", async function () {
      await expect(
        confidentialHealth.connect(user2).getMyHealthScore()
      ).to.be.revertedWith("No health data uploaded");
    });
  });

  describe("Data Management", function () {
    beforeEach(async function () {
      const dataHash = "QmHash123456789";
      const encryptedScore = ethers.parseUnits("85", 0);
      const encryptedRisk = ethers.parseUnits("2", 0);
      const encryptedAge = ethers.parseUnits("3", 0);

      await confidentialHealth.connect(user1).uploadHealthData(
        dataHash,
        encryptedScore,
        encryptedRisk,
        encryptedAge
      );
    });

    it("Should deactivate health data successfully", async function () {
      await confidentialHealth.connect(user1).deactivateHealthData();

      const healthData = await confidentialHealth.getUserHealthData(user1.address);
      expect(healthData[3]).to.be.false; // isActive
    });

    it("Should fail to deactivate already inactive data", async function () {
      await confidentialHealth.connect(user1).deactivateHealthData();

      await expect(
        confidentialHealth.connect(user1).deactivateHealthData()
      ).to.be.revertedWith("Health data not active");
    });

    it("Should emergency clear data successfully", async function () {
      await confidentialHealth.connect(user1).emergencyClearData();

      const healthData = await confidentialHealth.getUserHealthData(user1.address);
      expect(healthData[3]).to.be.false; // isActive
    });

    it("Should fail to emergency clear inactive data", async function () {
      await confidentialHealth.connect(user1).deactivateHealthData();

      await expect(
        confidentialHealth.connect(user1).emergencyClearData()
      ).to.be.revertedWith("Health data not active");
    });
  });
});
