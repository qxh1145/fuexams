import mongoose from 'mongoose';
import Test from './src/model/Test.js';
import User from './src/model/Users.js'; 

const MONGO_URI = 'mongodb+srv://knightdragon184_db_user:1111@prjdb.e2zc0ms.mongodb.net/exams?appName=PrjDB'; 

// --- HÀM TẠO SLUG THỦ CÔNG (Hỗ trợ Tiếng Việt) ---
function createSlug(str) {
  if (!str) return '';
  return String(str)
    .normalize('NFKD') // Tách dấu ra khỏi ký tự gốc
    .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Xóa ký tự đặc biệt
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-'); // Xóa gạch ngang trùng nhau
}

const migrateData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Đã kết nối Database");

    const tests = await Test.find({});
    console.log(`🔍 Tìm thấy ${tests.length} bài thi.`);

    for (const test of tests) {
      if (test.title) {
          // BƯỚC QUYẾT ĐỊNH: Tự tay tạo slug, không nhờ Plugin nữa
          const manualSlug = createSlug(test.title);
          
          // Gán trực tiếp vào
          test.slug = manualSlug;
          
          // Lưu bất chấp validation (Plugin có chạy hay không không quan trọng nữa)
          await test.save({ validateBeforeSave: false }); 
          
          console.log(`✅ Title: "${test.title}"`);
          console.log(`   -> Updated Slug: ${test.slug}`);
          console.log('-----------------------------------');
      } else {
          console.log(`⚠️ ID ${test._id} không có title để tạo slug.`);
      }
    }

    console.log("🎉 Hoàn tất Migration!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  }
};

migrateData();