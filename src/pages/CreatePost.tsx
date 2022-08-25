import "../styles/createpost.css";

export function CreatePost() {
  return (
    <div className="createpost">
      <div className="createpost__container">
        <h1>Create a post</h1>
        <div className="line"></div>
        <div className="input__wrapper">
          <input type="text" name="title" placeholder="Title..." />
        </div>
        <div className="input__wrapper">
          <textarea placeholder="Post..." />
        </div>
        <button className="createpost__button">Share Post</button>
      </div>
    </div>
  );
}
