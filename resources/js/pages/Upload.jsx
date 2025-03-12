import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const Upload = ({ url }) => {
    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    const handleFileChange = (e) => {
        setData("file", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/upload");
    };

    return (
        <div>
            <h2>Upload a file to S3</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" disabled={processing}>Upload</button>
            </form>

            {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}

            {url && (
                <p>
                    File uploaded successfully:{" "}
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                    </a>
                </p>
            )}
        </div>
    );
};

export default Upload;
