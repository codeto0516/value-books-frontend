/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    // ビルド時の型チェックをスキップ
    ignoreBuildErrors: true
  }
}

export default nextConfig
