import { Component } from "react";
import styles from './VideoBlock.module.css'

class VideoBlock extends Component{
	render(){
		return(
			<div className="embed-responsive embed-responsive-16by9">
					<iframe allowFullScreen={true} src={'https://www.youtube.com/embed/' + this.props.videoKey}
						title='title'>
					</iframe>
				</div>
		)
	}
}

export default VideoBlock