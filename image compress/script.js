
const imageInput = document.getElementById("imageInput");
const qualitySlider = document.getElementById("qualitySlider");
const qualityValue = document.getElementById("qualityValue");
const preview = document.getElementById("preview");

qualitySlider.addEventListener("input", () => {
  qualityValue.textContent = qualitySlider.value;
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

function compressImage() {
  const file = imageInput.files[0];
  if (!file) return;

  const quality = qualitySlider.value / 100;
  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();
    img.src = event.target.result;

    img.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "compressed-image.jpg";
          link.click();
        },
        "image/jpeg",
        quality
      );
    };
  };
  reader.readAsDataURL(file);
}