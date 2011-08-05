(function($) {

    /*
     * Auto-growing textareas; technique ripped from Facebook
     */
    $.fn.autogrow = function(options) {
        
        this.filter('textarea').each(function() {
            
            var $this       = $(this),
                minHeight   = $this.height(),
                lineHeight  = $this.css('lineHeight');
            
            var shadow = $('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      $(this).width(),
                fontSize:   $this.css('fontSize'),
                fontStyle:  $this.css('fontStyle'),
                fontWeight: $this.css('fontWeight'),
                fontFamily: $this.css('fontFamily'),
                lineHeight: $this.css('lineHeight'),
                wordWrap:   $this.css('wordWrap'),
                resize:     'none'
            }).appendTo(document.body);
            
            var update = function() {
                
                var val = this.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n/g, '<br/>');
                
                shadow.html(val + '...');
                $(this).css('height', Math.max(shadow.height(), minHeight));
            };
            
            $(this).change(update).keyup(update).keydown(update);
            
            update.apply(this);
            
        });
        
        return this;
        
    };
    
})(jQuery);
