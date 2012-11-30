jQuery(document).ready(function($) {
	var boxViewportHeight = $(window).height() - 100;
	//add link on posts and pages
	if ($('body.post-php, body.page-php, body.page-new.php, body.post-new-php').length > 0) {
		var post_id_hidden = $('form#post #post_ID');
		if (post_id_hidden) {

			post_id_hidden = parseInt(post_id_hidden.val());

			/** add link on top of editor **/
			$('#wp-content-media-buttons').append('<a style="margin:0 2em;" class="thickbox" href="' + ajaxurl + '?action=croppostthumb_ajax&amp;post_id=' + post_id_hidden + '&amp;TB_iframe=1&amp;width=800&amp;height=' + boxViewportHeight + '" title="Crop-Thumbnails">Crop-Thumbnails</a>');
		}
	}

	/** add link on mediathek **/
	if ($('body.upload-php').length > 0) {

		$('#the-list tr').each(function() {
			if ($(this).find('td.media-icon img').attr('src').lastIndexOf("/wp-includes/images/") == -1) {
				var post_id = parseInt($(this).attr('id').substr(5));
				var last_span = $(this).find('.column-title .row-actions span:last-child');
				last_span.append(' | ');
				last_span.parent().append('<a class="thickbox" href="' + ajaxurl + '?action=croppostthumb_ajax&amp;image_id=' + post_id + '&amp;viewmode=single&amp;TB_iframe=1&amp;width=800&amp;height=' + boxViewportHeight + '" title="Crop-Thumbnail">Crop-Thumbnail</a>')
			}
		});
	}
});

/** 
 * this function is called from featured-images-meta-box.php which renders the meta-box for featured images
 */
function cptCheck_SetFeaturedImage() {
	$ = jQuery;
	if ($('body.post-php, body.page-php, body.page-new.php, body.post-new-php').length > 0) {
		var meta_box = $('#select-featured-image');
		
		//write new
		$('.cptCropThumbnailFeaturedImageLink').remove();
		if(meta_box.hasClass('has-featured-image')) {
			var post_id_hidden = parseInt(meta_box.data('post-id'));
			var thumb_id_hidden = parseInt(meta_box.find('input[name="thumbnail_id"]').attr('value'));
			var boxViewportHeight = $(window).height() - 100;
			meta_box.append('<a class="thickbox button-secondary cptCropThumbnailFeaturedImageLink" href="' + ajaxurl + '?action=croppostthumb_ajax&amp;image_id=' + thumb_id_hidden + '&amp;parent_post_id=' +post_id_hidden+ '&amp;viewmode=single&amp;TB_iframe=1&amp;width=800&amp;height=' + boxViewportHeight + '" title="Crop-Thumbnail" style="margin-top:10px">Crop-Thumbnail</a>');
		}
	}
}