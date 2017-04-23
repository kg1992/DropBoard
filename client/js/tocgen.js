// -------- tocgen definition -------- //
var tocgen =
{    
  isTagNameHeader: function(tagName){
  return tagName.length == 2 
        && tagName[0] == 'H' 
        && tagName[1] >= 1
        && tagName[1] <= 6;
    },
    
   getHeaderDepth: function(tagName)
  {
    return tagName[1].charCodeAt(0) - "0".charCodeAt(0);
  },
  
  //
  // input:
  //    article - a html DOM element that contains headers(<h1>~<h6>).
  //    minDepth/maxDepth - sets range for header selection. example:
  //      2/4 - <h1>|<h2><h3><h4>|<h5><h6>
  //                 ~~~~~~~~~~~~
  //                Only h2, h3, h4 will be displayed on Table of Contents.
  // return: a 'ul' element. internal structure is:
  //        <ul>
  //            <li><a href=...>..</a>...</li>
  //            <li><a href=...>..</a>...</li>
  //            ...
  //        </ul>
  //
  // note: If you haven't set the id for headers, the function will give
  // id to header as it please without your concent.
  //
  generateToc:function(article, minDepth, maxDepth)
  {
    var ul = document.createElement("ul");
    var hCount = [ 0, 0, 0, 0, 0, 0 ]; // h1 ~ h6
    // We will do Depth-first travesal through every decendents in article node.
    var stack = [article];
    while( stack.length != 0 )
    {
      var node = stack.pop();
      
      if( this.isTagNameHeader(node.tagName) )
      {
        //
        // Set Id for headers
        //
        // get depth of the header: ( 1 <= depth <= 6 , h1~h6 )
        var depth = this.getHeaderDepth(node.tagName);
        // Ignore header that does not fall into the range specified by user.
        if( depth < minDepth || depth > maxDepth )
          continue;
        // gets header id or give a new one if not set already.
        // new id format is: tocgen_h#_#
        var id = "";
        if( !node.getAttribute("id") )
        {
          id = "tocgen_";
          id = id.concat(node.tagName.toLowerCase()).concat('_');
          id = id.concat(hCount[depth-1]);
          node.setAttribute("id", id);
        }
        // count the occurence of each header depth for numbering.
        hCount[depth-1]++;
        
        // Generates Hyperlink to each section as list item.
        // Format 
        //		#. [HeaderContent]
        //			#.#. [HeaderContent]
        //			  ...
        var li = document.createElement("li");
        var href = document.createElement("a");
        href.setAttribute("href", "#".concat(id));
        for( var i = minDepth-1; i < depth; ++i)
				{
        	href.innerHTML += hCount[i] + '.';
				}
        var temp = document.createElement('temp');
        temp.appendChild(href);
        li.innerHTML = temp.innerHTML + ' ' + node.innerHTML;
        li.setAttribute("tocgen_depth",depth);
        ul.appendChild(li);
        
      } // if
        
      // push children to traverse stack.
      // in reverse order so that the ealier instance examined first.
      var children = node.children;
      for( var i = children.length-1; i >= 0; --i )
      {
        stack.push(children[i]);
      } // for
      
    } // while
    return ul;
  } // generateToc
  
}; // tocgen
