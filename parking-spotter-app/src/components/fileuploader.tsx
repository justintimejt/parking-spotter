import React, { useState, useCallback } from "react";

//file upload component
const FileUploader: React.FC = () => {
    //state stores list of uploaded files
    const[files, setFiles] = useState<File[]>([]);

    //state to track dragged file to drop area
    const [isDragging, setIsDragging] = useState<boolean>(false);

    //handle file selection for input
    const handleFileInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {

        //check for selected files
        if (event.target.files) {

            //convert the filelist to an array and update file states 
            const selectedFiles = Array.from(event.target.files);
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);        }
    };

    //handle file drop event
    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        // Prevent the default browser behavior for drop events
        event.preventDefault();
        // Reset the dragging state
        setIsDragging(false);
    
        // Check if files were dropped
        if (event.dataTransfer.files) {
          // Convert the FileList to an array and update the files state
          const droppedFiles = Array.from(event.dataTransfer.files);
          setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        }
      }, []);

      const handleDragOver = useCallback((event:React.DragEvent <HTMLDivElement>) => {
        // Prevent the default browser behavior for drop events
        event.preventDefault();
        // Reset the dragging state
        setIsDragging(true);

      },[]);

      //handler for drag-leave event 
      const handleDragLeave = useCallback ((event: React.DragEvent<HTMLDivElement>) => {
         // Prevent the default browser behavior for drop events
         event.preventDefault();
         // Reset the dragging state
         setIsDragging(false);

    },[]);

       //remove file from the list 
        const removeFile = (index: number) => {

             //filter out file at specific index
            setFiles ((prevFiles) => prevFiles.filter ((_,i) => i !== index));

        };


        return (
            <div>
                {/*drag and drop area*/}
            <div

            onDrop={handleDrop} //handle file drop
            onDragOver ={handleDragOver} //handle drag over
            onDragLeave={handleDragLeave} //handle drag-leave

            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                border: isDragging ? '2px dashed #007bff' : '2px dashed #ccc',
                //change colour of the border when dragging it over
                padding: '20px',
                textAlign: 'center',
                backgroundColor: isDragging ? '#f0f8ff' : '#f9f9f9',
                borderRadius: '8px',
                marginBottom: '20px',
                height: '300px',
                marginLeft: '200px',
                marginRight: '200px'
            }}
        >

            <p className="drag-drop-text">Drag and drop files here</p>

            {/*file input element*/}
            <input
                type="file"
                multiple
                onChange={handleFileInputChange}
                style={{display: "none"}}
                accept=".png,.jpg,.jpeg,.pdf"
                id="file-input" 
            />

            {/*prompt file input*/}
            {/* <label htmlFor="file-input" className="browse-files-button">
                Browse Files
            </label> */}
        </div>

        {/* Display uploaded files*/}
        <div>
            <h3>Uploaded Files:</h3>
            <ul>
                {/*iterate through all files in array and display the files*/}
                {files.map((file,index) => (
                    <li key={index}>
                        {/*display file name, type, and size*/}
                        {file.name} - {file.type} - {(file.size / 1024).toFixed(2)}

                        {/*Button to remove file*/}
                        <button onClick={() => removeFile(index)} style={{ marginLeft: '10px', color: 'red'}}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
};


//export fileupload component
export default FileUploader;
