const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const avatarChooser = adForm.querySelector('.ad-form__field input[type=file]');
const avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');
const houseAvatarChooser = adForm.querySelector('.ad-form__input[type=file]');
const houseAvatarPreview = adForm.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

houseAvatarChooser.addEventListener('change', () => {
  const file = houseAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.setAttribute('height', '70px');
    image.setAttribute('width', '70px');
    image.style = 'object-fit: cover;';
    houseAvatarPreview.append(image);
  }
});

