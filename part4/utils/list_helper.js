const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	if(blogs.length === 0){
		return 0
	}else if(blogs.length === 1){
		return blogs[0].likes
	}else{
        let likesAmount = 0
        blogs.map(like => likesAmount += like.likes)
        return likesAmount
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }else if(blogs.length === 1){
        return blogs[0]
    }else{
        let mostLiked = blogs[0]
        blogs.map(like => {if(like.likes>mostLiked.likes) mostLiked = like})
        return mostLiked
    }

}

module.exports = {
	dummy,
    totalLikes,
    mostLikes
}