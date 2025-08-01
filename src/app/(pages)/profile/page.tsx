"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// Update interface untuk menghapus image
interface UserStats {
  stats: {
    totalDetections: number;
    plantsIdentified: number;
    accuracyRate: number;
    favoriteCategory: string;
  };
  recentDetections: Array<{
    id: string;
    plantName: string;
    detectedAt: string;
    confidence: number;
    // Hapus image property
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: string;
    progress?: number;
  }>;
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'achievements'>('overview');
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirect if not logged in
    if (!isPending && !session) {
      router.push('/login');
      return;
    }

    // Fetch user statistics when session is available
    if (session?.user) {
      fetchUserStats();
    }
  }, [session, isPending]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚀 Fetching user stats...');
      console.log('👤 Current session:', session?.user?.email);
      
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        
        if (response.status === 401) {
          console.log('🔒 Unauthorized - redirecting to login');
          router.push('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Fetched user stats:', data);
      
      if (data.recentDetections && data.recentDetections.length > 0) {
        console.log('📋 Recent detections found:', data.recentDetections.length);
      } else {
        console.log('📋 No recent detections found');
      }
      
      setUserStats(data);
    } catch (error) {
      console.error('❌ Error fetching user stats:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
      
      // Set fallback empty data
      setUserStats({
        stats: {
          totalDetections: 0,
          plantsIdentified: 0,
          accuracyRate: 0,
          favoriteCategory: "Belum ada"
        },
        recentDetections: [],
        achievements: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <div className="text-lg text-gray-600">Memuat profil...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  const userData = {
    id: session.user.id,
    name: session.user.name || 'User',
    email: session.user.email,
    avatar: session.user.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    joinDate: typeof session.user.createdAt === 'string'
      ? session.user.createdAt
      : new Date().toISOString(),
    // Add missing properties with fallbacks
    location: 'Indonesia', // Default location
    bio: 'Plant enthusiast yang senang mengidentifikasi tanaman.', // Default bio
    stats: userStats?.stats || {
      totalDetections: 0,
      plantsIdentified: 0,
      accuracyRate: 0,
      favoriteCategory: "Belum ada"
    },
    recentDetections: userStats?.recentDetections || [],
    achievements: userStats?.achievements || []
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={mounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      className="mx-auto max-w-7xl w-full px-4 py-16"
    >
      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <p className="text-yellow-800 text-sm">
              ⚠️ {error} - Menampilkan data default
            </p>
            <button
              onClick={fetchUserStats}
              className="text-yellow-900 underline hover:no-underline text-sm"
            >
              Coba lagi
            </button>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-font-primary mb-4">
          Profil Pengguna
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kelola profil dan lihat statistik deteksi tanaman Anda
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            {/* Avatar & Basic Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face';
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-font-primary mb-1">
                {userData.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{userData.email}</p>
              <p className="text-gray-500 text-sm">📍 {userData.location}</p>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="font-semibold text-font-primary mb-2">Bio</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {userData.bio}
              </p>
            </div>

            {/* Join Date */}
            <div className="border-t pt-4">
              <p className="text-gray-500 text-sm">
                📅 Bergabung sejak {formatDate(userData.joinDate)}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {userData.stats.totalDetections}
                </div>
                <div className="text-xs text-gray-600">Total Deteksi</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {userData.stats.accuracyRate}%
                </div>
                <div className="text-xs text-gray-600">Tingkat Akurasi</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {[
                  { key: 'overview', label: 'Ringkasan', icon: '📊' },
                  { key: 'history', label: 'Riwayat', icon: '🕒' },
                  { key: 'achievements', label: 'Pencapaian', icon: '🏆' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? 'border-green-500 text-green-600 bg-green-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-font-primary mb-6">Statistik Deteksi</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="text-3xl font-bold mb-2">{userData.stats.totalDetections}</div>
                      <div className="text-green-100">Total Deteksi</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="text-3xl font-bold mb-2">{userData.stats.plantsIdentified}</div>
                      <div className="text-blue-100">Tanaman Teridentifikasi</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="text-3xl font-bold mb-2">{userData.stats.accuracyRate}%</div>
                      <div className="text-purple-100">Tingkat Akurasi</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-font-primary mb-2">Kategori Favorit</h4>
                    <p className="text-gray-600">🌿 {userData.stats.favoriteCategory}</p>
                  </div>
                </motion.div>
              )}

              {/* History Tab - Updated without images */}
              {activeTab === 'history' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-font-primary mb-6">Riwayat Deteksi Terbaru</h3>
                  
                  {userData.recentDetections.length > 0 ? (
                    <div className="space-y-4">
                      {userData.recentDetections.map((detection) => (
                        <div key={detection.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            {/* Plant Icon instead of image */}
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🌱</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-font-primary">{detection.plantName}</h4>
                              <p className="text-sm text-gray-600">{formatDateTime(detection.detectedAt)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">
                              {detection.confidence}% akurat
                            </div>
                            <div className="text-xs text-gray-500">
                              Confidence Level
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-4xl mb-4">🔍</div>
                      <p className="text-lg mb-2">Belum ada riwayat deteksi</p>
                      <p className="text-sm">Mulai deteksi tanaman pertama Anda!</p>
                    </div>
                  )}

                  <div className="mt-6 text-center">
                    <button className="px-6 py-2 bg-green-secondary text-white rounded-full hover:bg-green-primary transition-colors">
                      Lihat Semua Riwayat
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-font-primary mb-6">Pencapaian</h3>
                  
                  {userData.achievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userData.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            achievement.unlocked
                              ? 'border-green-200 bg-green-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-semibold mb-1 ${
                                achievement.unlocked ? 'text-font-primary' : 'text-gray-500'
                              }`}>
                                {achievement.title}
                              </h4>
                              <p className={`text-sm mb-2 ${
                                achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {achievement.description}
                              </p>
                              {achievement.unlocked ? (
                                <p className="text-xs text-green-600 font-medium">
                                  ✅ Dibuka pada {achievement.unlockedAt ? formatDate(achievement.unlockedAt) : 'Tanggal tidak tersedia'}
                                </p>
                              ) : (
                                <div className="text-xs text-gray-500">
                                  Progress: {achievement.progress || 0}/100
                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div
                                      className="bg-green-500 h-2 rounded-full transition-all"
                                      style={{ width: `${achievement.progress || 0}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-4xl mb-4">🏆</div>
                      <p className="text-lg mb-2">Belum ada pencapaian</p>
                      <p className="text-sm">Mulai gunakan aplikasi untuk membuka pencapaian!</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}