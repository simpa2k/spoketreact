import React from 'react';

class FileUpload extends React.Component {

    /*
     * From https://stackoverflow.com/questions/13975031/reading-multiple-files-with-javascript-filereader-api-one-at-a-time
     * With minor modifications. The reason it has to be done this way is that there will be memory leaks if
     * the FileReader is not reused, and it's not entirely straightforward to reuse a FileReader.
     */
    readFiles(files) {

        let reader = new FileReader();

        let readFile = (index) => {

            if (index >= files.length) {
                return;
            }

            let file = files[index];

            reader.onload = (event) => {

                this.props.handleFile(event.target.result);
                readFile(++index);

            };
            reader.readAsDataURL(file);

        };
        readFile(0);

    }

    render() {

        return (

            <label className="btn btn-primary btn-file">
                {this.props.label}
                <input type="file" style={{display: 'none'}} onChange={(event) => this.readFiles(event.target.files)} multiple />
            </label>

        )
    }
}

export default FileUpload