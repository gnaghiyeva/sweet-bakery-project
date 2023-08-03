const multer = require('multer')
const uuid = require('uuid')

const DIR = './detailimages/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + fileName)
    }
});

module.exports =  upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }

    // limits: {
    //     fileSize: 2 * 1024 * 1024, // 2 MB (maksimum fayl ölçüsü)
    //     files: 2 // 2 şəkil (maksimum fayl sayı)
    //   },
    //   fileFilter: (req, file, cb) => {
    //     // Burada şəkillərin sayını yoxlamaq üçün qoşulardı yoxlaya bilərsiniz.
    //     // Ehtiyacınıza görə filterləmək olar. Məsələn, yalnız şəkil fayllarını keçirməyiniz istənilən formatlarla əlaqədar olacaq.
    //     const allowedMimeTypes = ['image/jpeg', 'image/png'];
    //     if (allowedMimeTypes.includes(file.mimetype)) {
    //       cb(null, true);
    //     } else {
    //       cb(new Error('Yalnız JPEG və PNG şəkilləri qəbul olunur.'));
    //     }
    //   }
    
});;
