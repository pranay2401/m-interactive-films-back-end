function movie(data) {
    return {
        id: data.id,
        mId: data.mId,
        name: data.name,
        title: data.title,
        url: data.url,
        description: data.description,
        thumbnails: data.thumbnails,
        genre: data.genre,
        rating: data.rating,
		createdAt: data.createdAt,
		publishedAt: data.publishedAt,
		isPublished: data.isPublished,
		editorId: data.editorId,
		isFeatured: data.isFeatured,
		watchlistedUsers: data.watchlistedUsers,
        comments: data.comments,
        hotspots: data.hotspots && Object.values(data.hotspots),
        overlays: data.overlays && Object.values(data.overlays),
        templateActions: data.templateActions,
        triggers: data.triggers,
        interactiveData: data.interactiveData
    };
  }
  module.exports = movie;