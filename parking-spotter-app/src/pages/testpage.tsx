import React from 'react';
import FileUploader from '../components/fileuploader';




const TestPage: React.FC = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page for debugging and development.</p>
      <FileUploader/>
    </div>
  );
};

export default TestPage;