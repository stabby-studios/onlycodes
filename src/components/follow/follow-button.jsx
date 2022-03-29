import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const FollowButton = ({ followerList }) => {

	const [following, setFollowing] = React.useState(null)

	console.log(followerList)


	const handleFollowClick = () => {
		setFollowing(true)
	}

	const handleUnfollowClick = () => {
		setFollowing(false)
	}

	return (
		<button className="relative left-8 w-12 bg-pink-500 rounded hover:bg-pink-700 transition-colors ease-in-out delay-75">
			{
				following ?
				<FontAwesomeIcon icon={faMinus} onClick={handleUnfollowClick}/>
				 :
				 <FontAwesomeIcon icon={faPlus} onClick={handleFollowClick}/>
			}
		</button>
	)
}

export default FollowButton