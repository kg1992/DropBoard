var Modal = function(form)
{
    this.trigger = function()
    {
        form.style.display = "block";
    }
    
    this.confirm = function()
    {
        if( form.onokay )
        {
            try{
                form.onokay();
            } catch ( e )
            {
                console.log(e);
            }
        }
        form.style.display = "none";
    }
    
    this.dismiss = function()
    {
        form.style.display = "none";
    }
    
    var close_buttons = form.getElementsByClassName('close');
    for( var i = 0; i < close_buttons.length; ++i )
    {
        var close_button = close_buttons[i];
        close_button.onclick = this.dismiss;
    }
    
    var okay_buttons = form.getElementsByClassName('okay');
    for( var i = 0; i < okay_buttons.length; ++i )
    {
        var okay_button = okay_buttons[i];
        okay_button.onclick = this.confirm;
    }
    
    return this;
}