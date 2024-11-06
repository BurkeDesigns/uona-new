import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Avatar, Button as Btn, Icon, Input, List, Text } from "@blocks";
import { post, postForm } from "@util/fetch";
import { debounce } from "@util/debounce";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

type Props = React.HTMLAttributes<HTMLElement> & {
	src?: string;
	alt?: string;
};

gsap.registerPlugin(ScrollToPlugin);

const component = (props: Props) => {
	const { src, alt } = props;

	const fileInput: any = useRef(null);
	const [photos, setPhotos] = useState([]);
	const opened: any = useRef(null);
	const [openedState, setOpenedState]: any = useState(opened.current);
	const lastSelectedIndex = useRef(0);
	const [selected, setSelected]: any = useState(new Set());
	const [uploadStatus, setUploadStatus] = useState("");
	const selectedRef = useRef(selected);

	const openFileSelector = () => fileInput.current.click();

	const listPhotos = async () => {
		let res = await post("http://localhost:3003/photos/list");
		console.log(res);
		setPhotos(res.list);
	};

	const addToSelected = (value) => {
		setSelected((prevSet) => {
			const newSet = new Set(prevSet); // Create a new Set to trigger state update
			if (newSet.has(value) == true) {
				newSet.delete(value);
			} else {
				newSet.add(value);
			}
			selectedRef.current = newSet;
			return newSet; // Return the new Set
		});
	};

	const addRangeToSelected = (start: number, end: number) => {
		let max = Math.max(start, end);
		let min = Math.min(start, end);
		let arr = photos.slice(min, max + 1);

		setSelected((prevSet) => {
			let prevSetArr = Array.from(prevSet);
			const newSet = new Set([...prevSetArr, ...arr]); // Create a new Set to trigger state update
			selectedRef.current = newSet;
			return newSet; // Return the new Set
		});
	};

	const deleteSelected = async () => {
		if (selectedRef.current.size == 0) return;
		// Immediately update the photos state by removing the selected photos
		setPhotos((prevPhotos) => {
			return prevPhotos.filter(
				(photo) => !selectedRef.current.has(photo)
			);
		});
		let res = await post(`http://localhost:3003/photos/delete`, {
			files: Array.from(selectedRef.current),
		});
		selectCurrent();
		setTimeout(() => listPhotos(), 1000);
	};

	const selectAll = () => {
		setPhotos((photosVal) => {
			console.log(photosVal);
			setSelected(new Set(photosVal));
			selectedRef.current = new Set(photosVal);
			return photosVal;
		});
	};

	const clearSelected = () => {
		setSelected(new Set());
		selectedRef.current = new Set();
		lastSelectedIndex.current = 0;
		opened.current = null;
		setOpenedState(opened.current);
	};
	const arrowRight = () => {
		setPhotos((p) => {
			if (lastSelectedIndex.current < p.length - 1) {
				lastSelectedIndex.current++;
				console.log(p[lastSelectedIndex.current]);
				opened.current = p[lastSelectedIndex.current];
				setOpenedState(opened.current);
				console.log(opened.current);
				setSelected(() => {
					const newSet = new Set([p[lastSelectedIndex.current]]); // Create a new Set to trigger state update
					selectedRef.current = newSet;
					return newSet; // Return the new Set
				});
			}
			return p;
		});
		let el = window[opened.current];
		el.scrollIntoView({ behavior: "smooth", inline: "center" });
	};
	const arrowLeft = (e) => {
		console.log("EVENT", e);
		// if (e.shiftKey) {
		// 	alert("hi");
		// 	// addRangeToSelected(lastSelectedIndex.current, index);
		// 	return;
		// }
		setPhotos((p) => {
			if (lastSelectedIndex.current >= 1) {
				lastSelectedIndex.current--;
				console.log(p[lastSelectedIndex.current]);
				opened.current = p[lastSelectedIndex.current];
				setOpenedState(opened.current);
				console.log(opened.current);
				setSelected(() => {
					const newSet = new Set([p[lastSelectedIndex.current]]); // Create a new Set to trigger state update
					selectedRef.current = newSet;
					return newSet; // Return the new Set
				});
			}
			return p;
		});
		let el = window[opened.current];
		el.scrollIntoView({ behavior: "smooth", inline: "center" });
	};

	const selectCurrent = () => {
		setPhotos((p) => {
			let current =
				p[lastSelectedIndex.current] ||
				p[lastSelectedIndex.current - 1] ||
				p[0];
			if (current) {
				if (opened.current) {
					opened.current = current;
					setOpenedState(opened.current);
				}
				setSelected(() => {
					const newSet = new Set([current]); // Create a new Set to trigger state update
					selectedRef.current = newSet;
					return newSet; // Return the new Set
				});
			} else {
				clearSelected();
			}
			return p;
		});
		let el = window[opened.current];
		el.scrollIntoView({ behavior: "smooth", inline: "center" });
	};

	const selectPhoto = async (e, item, index) => {
		if (e.shiftKey) {
			addRangeToSelected(lastSelectedIndex.current, index);
			return;
		}
		addToSelected(item);
		lastSelectedIndex.current = index || 0;
	};

	const exportSelected = async () => {
		if (selectedRef.current.size == 0) return;
		Array.from(selectedRef.current).map(async (item) => {
			let filename = item;
			let url = `http://localhost:3003/photos/get/${filename}/original`;
			const image = await fetch(url);
			const imageBlog = await image.blob();
			const imageURL = URL.createObjectURL(imageBlog);

			const link: any = document.createElement("a");
			link.href = imageURL;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		});
		// clearSelected();
		// setTimeout(() => listPhotos(), 1000);
	};

	useEffect(() => {
		listPhotos();
		const handleKey = (event) => {
			const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
			console.log(event.key);

			// Check if Cmd + A (for Mac) or Ctrl + A (for Windows) is pressed
			if (
				(isMac && event.metaKey && event.key === "a") ||
				(!isMac && event.ctrlKey && event.key === "a")
			) {
				event.preventDefault(); // Prevent the default "select all" action
				console.log("Cmd + A or Ctrl + A detected");

				// Trigger your custom function
				selectAll();
			}
			let el;
			switch (event.key) {
				case "Escape":
					clearSelected();
					break;
				case "Backspace":
					event.preventDefault();
					deleteSelected();
					break;
				case "Delete":
					deleteSelected();
					break;
				case "ArrowRight":
					event.preventDefault();
					event.stopPropagation();
					arrowRight();
					break;
				case "ArrowLeft":
					event.preventDefault();
					event.stopPropagation();
					arrowLeft();
					break;
			}
		};

		// Add event listener when the component mounts
		window.addEventListener("keydown", handleKey);

		// (async () => {
		// 	let src = await generateVideoThumbnail(
		// 		`http://localhost:3003/photos/get/C0022.MP4/original?t=${Date.now()}`
		// 	);
		// 	console.log(src);
		// })();
	}, []);

	const generateVideoThumbnail = async (
		videoUrl: string,
		width = 150,
		height = 100,
		timestamp = 1
	): Promise<string> => {
		return new Promise((resolve, reject) => {
			// Create a hidden video element
			const video = document.createElement("video");
			video.src = videoUrl;
			video.crossOrigin = "anonymous"; // If the video is from a different domain, ensure CORS is enabled
			video.muted = true; // Ensure no audio is played
			video.width = width;
			video.height = height;
			video.currentTime = timestamp; // Set the time of the frame to capture

			// Wait until the video metadata is loaded
			video.onloadeddata = () => {
				// Create a canvas element to draw the video frame
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;

				const context = canvas.getContext("2d");
				if (context) {
					context.drawImage(video, 0, 0, width, height);

					// Convert the canvas to a data URL (image format)
					const thumbnailUrl = canvas.toDataURL("image/png");
					resolve(thumbnailUrl); // Resolve with the thumbnail data URL
				} else {
					reject(new Error("Unable to create canvas context"));
				}
			};

			video.onerror = () => {
				reject(new Error("Error loading video"));
			};
		});
	};

	const handleFileSelected = async (e) => {
		let files = e.target.files;
		console.log(files);

		let uploadCount = Array.from(files).length;

		setUploadStatus(`Uploading ${uploadCount} Photos`);

		// Create an array of promises to upload each file
		const uploadPromises = Array.from(files).map(async (file: any) => {
			const formData: any = new FormData();
			formData.append("file", file);
			formData.append("name", file.name);
			formData.append("size", file.size);
			formData.append("type", file.type);
			formData.append("lastModified", file.lastModified);

			// Upload the file
			let res = await postForm(
				"http://localhost:3003/photos/upload",
				formData
			);

			uploadCount--;
			setUploadStatus(`Uploading ${uploadCount} Photos...`);

			// // Update the photos state after each file upload
			// setPhotos((val) => {
			// 	let set = new Set([file.name, ...val]);
			// 	return Array.from(set); // Add the uploaded file name to the photos array
			// });

			return res; // Return the response to include in the promise array
		});

		try {
			// Wait for all the upload promises to complete
			await Promise.all(uploadPromises);
			console.log("All uploads completed");
			setUploadStatus("");

			// Once all uploads are done, call listPhotos
			listPhotos();
		} catch (error) {
			console.error("Error during file upload:", error);
		}
	};

	return (
		<>
			<List el="column-between xsm center" onClick={clearSelected}>
				<Text as="h3" color="white">
					Photos
				</Text>
				{selected.size > 0 && (
					<>
						<List el="column sm center" className="deleteBtn">
							<Text
								content={`delete ${selected.size} ${selected.size == 1 ? "photo" : "photos"}`}
								font="button"
								color="currentColor"
								onClick={deleteSelected}
								style={{ cursor: "pointer" }}
							/>
							<Btn
								variant="secondaryWhite"
								onClick={exportSelected}
							>
								export
							</Btn>
						</List>
					</>
				)}
				{selected.size == 0 && (
					<>
						{uploadStatus == "" && (
							<Btn onClick={openFileSelector}>Upload</Btn>
						)}
						{uploadStatus != "" && (
							<Btn disabled>{uploadStatus}</Btn>
						)}
					</>
				)}
			</List>
			<input
				id="filesSearch"
				type="file"
				name="files"
				ref={fileInput}
				onChange={handleFileSelected}
				accept=".jpg,.jpeg,.svg,.png,.webp,.avif,.gif,.mp4"
				multiple
			/>
			<div className={`viewer ${openedState ? "opened" : ""}`}>
				{openedState && (
					<>
						<div className="preview">
							{!openedState.endsWith(".MP4") && (
								<div
									className="img"
									style={{
										backgroundImage: `url(http://localhost:3003/photos/get/${openedState}/1080?t=${Date.now()})`,
									}}
								></div>
							)}
							{openedState.endsWith(".MP4") && (
								<video
									src={`http://localhost:3003/photos/get/${openedState}/original?t=${Date.now()}`}
									controls
									controlsList="nodownload"
								></video>
							)}
						</div>
						<List el="lg" className="details">
							<List el="xxsm">
								<List el="column-between xsm center">
									<Text
										as="h5"
										color="white"
										content={opened.current}
										title={opened.current}
										style={{
											overflow: "hidden",
											whiteSpace: "nowrap",
											textOverflow: "ellipsis",
											width: "100%",
										}}
									/>
									<Btn>Request Edit</Btn>
								</List>
								<List el="xsm">
									<Text
										color="gray-1"
										font="bodyS"
										content="Size: 10 MB, Last Modified 9/9/24"
										style={{
											fontStyle: "italic",
										}}
									/>
								</List>
								<Text
									color="white"
									content="This is a description of the photo generated by AI. It will detail everything in the image so you can search for whatever you are looking for."
								/>
							</List>
							<List el="xsm" className="comments">
								<Input
									placeholder="Add comment"
									onKeyDown={(e) => e.stopPropagation()}
								/>
								<List el="column xsm">
									<Avatar
										shape="circle"
										size={35}
										src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewpersonaltraining-697509.jpg&fm=jpg"
									/>
									<List el="xxsm">
										<List el="column center xsm">
											<Text
												color="white"
												font="bodySBold"
												content="John Doe"
											/>
											<Text
												color="gray-1"
												font="bodyXS"
												content="2 days ago"
											/>
										</List>
										<Text
											color="white"
											font="bodyS"
											content="Yes, I can gladly do that for you!"
										/>
									</List>
								</List>
								<List el="column xsm">
									<Avatar
										shape="circle"
										size={35}
										src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4PCrSTKCGEGp1oMxmbOfWzl_9qM7ArGn0vg&s"
									/>
									<List el="xxsm">
										<List el="column center xsm">
											<Text
												color="white"
												font="bodySBold"
												content="Karen Smith"
											/>
											<Text
												color="gray-1"
												font="bodyXS"
												content="4 days ago"
											/>
										</List>
										<Text
											color="white"
											font="bodyS"
											content="Can you adjust the colors in this photo?"
										/>
									</List>
								</List>
							</List>
							{/* <List el="xsm">
								<Text>Size: </Text>
							</List> */}
							{/* <hr /> */}
						</List>
					</>
				)}
				<div className="photos" onClick={clearSelected}>
					{photos.map((item, index) => (
						<div
							id={item}
							key={item}
							onDoubleClick={(e) => {
								e.stopPropagation();
								clearSelected();
								selectPhoto(e, item, index);
								opened.current = item;
								setOpenedState(opened.current);
								console.log(item);
								setTimeout(() => {
									let el = window[opened.current];
									el.scrollIntoView({
										behavior: "smooth",
										inline: "center",
									});
								}, 100);
							}}
							onClick={(e) => {
								e.stopPropagation();
								selectPhoto(e, item, index);
							}}
							className={`thumbnail ${selected.has(item) ? "selected" : ""}`}
						>
							{!item.endsWith(".MP4") && (
								<img
									src={`http://localhost:3003/photos/get/${item}/350?t=${Date.now()}`}
									title={item}
									alt={item}
									className="img"
									onContextMenu={(e) => e.preventDefault()}
									draggable="false"
									loading="lazy"
								/>
							)}
							{item.endsWith(".MP4") && (
								<List
									el="xsm center"
									style={{
										justifyContent: "center",
										alignContent: "center",
										height: "100%",
									}}
								>
									{openedState && (
										<>
											<Text
												font="button"
												color="currentColor"
											>
												video
											</Text>
											{/* <Icon
												name="play-circle"
												size={60}
											/> */}
										</>
									)}
									{!openedState && (
										<Text
											font="button"
											color="currentColor"
											style={{ fontSize: 30 }}
										>
											video
										</Text>
										// <Icon name="play-circle" size={85} />
									)}
								</List>
							)}
						</div>
					))}
					<List
						className="thumbnail"
						style={{
							alignContent: "center",
							justifyContent: "center",
						}}
						onClick={(e) => {
							e.stopPropagation();
							openFileSelector();
						}}
					>
						{!openedState && <Icon name="plus" size={100} />}
						{openedState && <Icon name="plus" size={60} />}
					</List>
				</div>
			</div>
		</>
	);
};

export default component;
