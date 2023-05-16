export default function CreatePost({ setShowCreatePostModal }) {
	return (
		<>
			<div id="create-post-container">
				<div id="create-post-body">
					<div id="create-post-header">
						<span>Create Post</span>
						<span id="create-post-header-close" title={"Close"} onClick={()=> setShowCreatePostModal(false) }>
							<i className="fas fa-times"></i>
						</span>
					</div>
					<div id="create-post-body-input-image">
						+
					</div>
					<div id="create-post-body-input-content">
						<textarea name="" id="create-post-body-input-content">
						</textarea>
					</div>
				</div>
			</div>
		</>
	)
}
