console.log('🔍 PostCSS config is being loaded!');
console.log('📁 Current directory:', __dirname);

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
