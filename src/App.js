import "./App.css";
import { useState, useRef } from "react";
import { CSVLink } from "react-csv";

const headers = [
	{ label: "First Name", key: "firstname" },
	{ label: "Last Name", key: "lastname" },
	{ label: "Email", key: "email" },
];

const data = [
	{ firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
	{ firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
	{ firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
];

function App() {
	const [file, setFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
	const hiddenFileInput = useRef(null);

	const handleFileChange = (e) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
			console.log(e.target.files);
		}
	};

	const handleUpload = async () => {
		if (file) {
			console.log("Uploading file...");

			const formData = new FormData();
			formData.append("file", file);

			try {
				// You can write the URL of your server or any other endpoint used for file upload
				const result = await fetch("https://slip-reader-processor-415f9c26f2e3.herokuapp.com/upload", {
					method: "POST",
					body: formData,
				});

				const data = await result.json();

        setCsvFile(data)

				console.log(data);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleClick = () => {
		hiddenFileInput.current.click();
	};

	return (
		<div className="flex justify-center items-center h-[100vh]">
			<header className="flex flex-col gap-10 items-center">
				<p className="text-4xl font-bold">Welcome</p>
				<p className="text-2xl">Upload PDF below.</p>
				<div className="flex flex-col">
					<button
						className="bg-gray-500 text-white px-10 py-5 rounded-md text-2xl"
						onClick={handleClick}
					>
						Choose a file
					</button>
					<input
						id="file"
						type="file"
						className="invisible"
						ref={hiddenFileInput}
						onChange={handleFileChange}
					/>
				</div>
				{file && (
					<section className="flex flex-col gap-2">
						<p className="text-2xl font-semibold">File details:</p>
						<ul>
							<li>Name: {file.name}</li>
							<li>Type: {file.type}</li>
							<li>Size: {file.size} bytes</li>
						</ul>
					</section>
				)}
				{file && (
					<button
						onClick={handleUpload}
						className="mt-1 bg-blue-500 px-10 py-5 rounded-md text-white"
					>
						Upload pdf
					</button>
				)}
				{csvFile && <CSVLink data={data} headers={headers} className="bg-teal-500 text-white px-10 py-5 rounded-md">
					Download csv here
				</CSVLink>}
			</header>
		</div>
	);
}

export default App;
