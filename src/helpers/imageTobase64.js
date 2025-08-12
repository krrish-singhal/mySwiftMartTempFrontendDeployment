const imageTobase64 = async (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // ✅ Reduce the image size before encoding (resize to 150x150)
                const maxWidth = 150; // Change as needed
                const maxHeight = 150;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                // ✅ Convert to base64 with compression
                const compressedData = canvas.toDataURL("image/jpeg", 0.7); // 0.7 = 70% quality
                resolve(compressedData);
            };
        };
        reader.onerror = (error) => reject(error);
    });
};

export default imageTobase64;
