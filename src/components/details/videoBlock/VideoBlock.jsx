import { Component } from "react";
import styles from './VideoBlock.module.css'

class VideoBlock extends Component{
	render(){
		return(
			<div className={styles.video}>
					<iframe allowFullScreen={true} src={'https://www.youtube.com/embed/' + this.props.videoKey}
						title='title'>
					</iframe>
				</div>
		)
	}
}

export default VideoBlock