export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({name, about, avatar, _id}) {
    _id && (this._id = _id);
    avatar && (this._avatarElement.src = avatar);
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  getUserId() {
    return this._id;
  }
}
