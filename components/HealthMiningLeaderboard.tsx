"use client";

import { useState, useEffect } from "react";
import { useHealthVault } from "@/hooks/useHealthVault";

interface MiningStats {
  points: number;
  streak: number;
  uploads: number;
  quality: number;
  rank: number;
}

interface TopMiner {
  address: string;
  points: number;
}

export default function HealthMiningLeaderboard() {
  const [userStats, setUserStats] = useState<MiningStats | null>(null);
  const [topMiners, setTopMiners] = useState<TopMiner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'my-stats'>('leaderboard');
  
  const { 
    address, 
    isConnected,
    getUserMiningStats,
    getTopMiners,
    getLeaderboardSize
  } = useHealthVault();

  useEffect(() => {
    const loadMiningData = async () => {
      if (!isConnected || !address) return;
      
      setIsLoading(true);
      try {
        // Load user stats
        const stats = await getUserMiningStats(address);
        setUserStats({
          points: Number(stats.points),
          streak: Number(stats.streak),
          uploads: Number(stats.uploads),
          quality: Number(stats.quality),
          rank: Number(stats.rank)
        });

        // Load top miners
        const [addresses, points] = await getTopMiners(10);
        const miners: TopMiner[] = addresses.map((addr: string, index: number) => ({
          address: addr,
          points: Number(points[index])
        }));
        setTopMiners(miners);
      } catch (error) {
        console.error('Failed to load mining data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMiningData();
  }, [isConnected, address, getUserMiningStats, getTopMiners]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getQualityLevel = (quality: number) => {
    if (quality >= 80) return { level: 'Excellent', color: 'text-emerald-400' };
    if (quality >= 60) return { level: 'Good', color: 'text-blue-400' };
    if (quality >= 40) return { level: 'Fair', color: 'text-yellow-400' };
    return { level: 'Basic', color: 'text-orange-400' };
  };

  const getStreakLevel = (streak: number) => {
    if (streak >= 7) return { level: 'Fire', emoji: '🔥' };
    if (streak >= 3) return { level: 'Hot', emoji: '⚡' };
    if (streak >= 1) return { level: 'Warm', emoji: '🌡️' };
    return { level: 'Cold', emoji: '❄️' };
  };

  if (!isConnected) {
    return (
      <div className="health-vault-card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-50 mb-2">Connect Wallet</h3>
        <p className="text-slate-300">Connect your wallet to view mining statistics and leaderboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-50 mb-4">
          🏆 Health Data Mining
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Earn points by uploading health data and maintaining consistent data quality. 
          Compete with other users on the leaderboard!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'leaderboard'
              ? 'health-vault-button'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          🏆 Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('my-stats')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'my-stats'
              ? 'health-vault-button'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          📊 My Stats
        </button>
      </div>

      {isLoading ? (
        <div className="health-vault-card p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 health-pulse">
            <span className="text-3xl">⏳</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-50 mb-2">Loading Mining Data</h3>
          <p className="text-slate-300">Fetching your mining statistics and leaderboard...</p>
        </div>
      ) : (
        <>
          {activeTab === 'leaderboard' && (
            <div className="health-vault-card p-6">
              <h3 className="text-xl font-semibold text-slate-50 mb-6 text-center">
                🏆 Top Health Data Miners
              </h3>
              
              {topMiners.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🏆</div>
                  <p className="text-slate-300">No miners yet. Be the first to start mining!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {topMiners.map((miner, index) => (
                    <div key={miner.address} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {getRankIcon(index + 1)}
                          </span>
                        </div>
                        <div>
                          <p className="text-slate-50 font-medium">
                            {miner.address.slice(0, 6)}...{miner.address.slice(-4)}
                          </p>
                          <p className="text-slate-400 text-sm">Rank #{index + 1}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-400">{miner.points.toLocaleString()}</p>
                        <p className="text-slate-400 text-sm">Points</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'my-stats' && userStats && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="health-vault-card p-6">
                <h3 className="text-xl font-semibold text-slate-50 mb-6 text-center">
                  📊 Your Mining Statistics
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-400">{userStats.points.toLocaleString()}</div>
                    <div className="text-slate-300 text-sm">Total Points</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{userStats.streak}</div>
                    <div className="text-slate-300 text-sm">Current Streak</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{userStats.uploads}</div>
                    <div className="text-slate-300 text-sm">Data Uploads</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400">{userStats.quality}</div>
                    <div className="text-slate-300 text-sm">Quality Score</div>
                  </div>
                </div>

                {/* Rank Display */}
                {userStats.rank > 0 ? (
                  <div className="text-center p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="text-3xl mb-2">{getRankIcon(userStats.rank)}</div>
                    <h4 className="text-xl font-semibold text-slate-50">Rank #{userStats.rank}</h4>
                    <p className="text-slate-300">You're in the top miners!</p>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-3xl mb-2">🏃</div>
                    <h4 className="text-xl font-semibold text-slate-50">Keep Mining!</h4>
                    <p className="text-slate-300">Upload more data to enter the leaderboard</p>
                  </div>
                )}
              </div>

              {/* Detailed Stats */}
              <div className="health-vault-card p-6">
                <h3 className="text-xl font-semibold text-slate-50 mb-4">📈 Detailed Statistics</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <p className="text-slate-50 font-medium">Mining Streak</p>
                        <p className="text-slate-400 text-sm">
                          {getStreakLevel(userStats.streak).emoji} {getStreakLevel(userStats.streak).level}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-400">{userStats.streak} days</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <p className="text-slate-50 font-medium">Data Quality</p>
                        <p className="text-slate-400 text-sm">
                          {getQualityLevel(userStats.quality).level}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${getQualityLevel(userStats.quality).color}`}>
                        {userStats.quality}/100
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📤</span>
                      <div>
                        <p className="text-slate-50 font-medium">Total Uploads</p>
                        <p className="text-slate-400 text-sm">Health data records</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-purple-400">{userStats.uploads}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mining Tips */}
              <div className="health-vault-card p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-slate-50 mb-4">💡 Mining Tips</h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-400">✓</span>
                    <p>Upload data daily to maintain your streak and earn bonus points</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-400">✓</span>
                    <p>Consistent data uploads improve your quality score</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-400">✓</span>
                    <p>Higher quality scores earn more points per upload</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-400">✓</span>
                    <p>Connect multiple devices for more data variety</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
