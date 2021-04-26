import React from "react";

const FileUpload = () => {
  return (
    <div className="container">
      <img id="testImage" src="" alt="test" />
      <form id="testForm">
        <input
          type="file"
          className="form-control-file"
          accept="image/*"
          name="photo"
          onChange={(e) => {
            // preview images on website
            const testImage = document.querySelector("#testImage");
            const reader = new FileReader();
            const file = e.target.files[0];

            if (file) {
              // read file
              reader.readAsDataURL(file);
            }

            reader.addEventListener(
              "load",
              function () {
                // convert image file to base64 string (which is stored in reader.result)
                // don't send the base64 string directly to the backend, because large files won't be able to be sent (PayloadTooLargeError: request entity too large)
                testImage.src = reader.result;
              },
              false
            );
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();

            const testForm = document.querySelector("#testForm");
            const formData = new FormData(testForm);

            // post formdata to backend
            fetch("http://localhost:3310/customize/test-file-upload", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.text())
              .then((filename) => console.log(filename));
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
