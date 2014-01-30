Ext.data.JsonP.SampleApp_view_device_Location({"tagname":"class","name":"SampleApp.view.device.Location","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Location.js","href":"Location.html#SampleApp-view-device-Location"}],"aliases":{"widget":["att-device-tl"]},"alternateClassNames":[],"extends":"Ext.Container","mixins":[],"requires":["Ext.Map","Ext.field.Radio","Ext.form.FieldSet","Ext.form.Panel","SampleApp.Config","SampleApp.view.Footer","SampleApp.view.Header"],"uses":[],"members":[{"name":"layout","tagname":"cfg","owner":"SampleApp.view.device.Location","id":"cfg-layout","meta":{"private":true}},{"name":"title","tagname":"cfg","owner":"SampleApp.view.device.Location","id":"cfg-title","meta":{"private":true}},{"name":"_mapMarker","tagname":"property","owner":"SampleApp.view.device.Location","id":"property-_mapMarker","meta":{"private":true}},{"name":"buildLocationForm","tagname":"method","owner":"SampleApp.view.device.Location","id":"method-buildLocationForm","meta":{}},{"name":"getLayout","tagname":"method","owner":"SampleApp.view.device.Location","id":"method-getLayout","meta":{}},{"name":"getTitle","tagname":"method","owner":"SampleApp.view.device.Location","id":"method-getTitle","meta":{}},{"name":"initialize","tagname":"method","owner":"SampleApp.view.device.Location","id":"method-initialize","meta":{"private":true}},{"name":"setLayout","tagname":"method","owner":"SampleApp.view.device.Location","id":"method-setLayout","meta":{}},{"name":"setMapLocation","tagname":"method","owner":"SampleApp.view.device.Location","id":"method-setMapLocation","meta":{}},{"name":"setTitle","tagname":"method","owner":"SampleApp.view.device.Location","id":"method-setTitle","meta":{}}],"code_type":"ext_define","id":"class-SampleApp.view.device.Location","component":false,"superclasses":["Ext.Container"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Container<div class='subclass '><strong>SampleApp.view.device.Location</strong></div></div><h4>Requires</h4><div class='dependency'>Ext.Map</div><div class='dependency'>Ext.field.Radio</div><div class='dependency'>Ext.form.FieldSet</div><div class='dependency'>Ext.form.Panel</div><div class='dependency'><a href='#!/api/SampleApp.Config' rel='SampleApp.Config' class='docClass'>SampleApp.Config</a></div><div class='dependency'><a href='#!/api/SampleApp.view.Footer' rel='SampleApp.view.Footer' class='docClass'>SampleApp.view.Footer</a></div><div class='dependency'><a href='#!/api/SampleApp.view.Header' rel='SampleApp.view.Header' class='docClass'>SampleApp.view.Header</a></div><h4>Files</h4><div class='dependency'><a href='source/Location.html#SampleApp-view-device-Location' target='_blank'>Location.js</a></div></pre><div class='doc-contents'><p>User Interface for the Terminal Location (TL) application.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-layout' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-cfg-layout' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-cfg-layout' class='name expandable'>layout</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'card'</code></p></div></div></div><div id='cfg-title' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-cfg-title' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-cfg-title' class='name expandable'>title</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'Device Location'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_mapMarker' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-property-_mapMarker' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-property-_mapMarker' class='name expandable'>_mapMarker</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-buildLocationForm' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-method-buildLocationForm' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-method-buildLocationForm' class='name expandable'>buildLocationForm</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Builds the UI components for Feature 1: Map of Device Location. ...</div><div class='long'><p>Builds the UI components for Feature 1: Map of Device Location.</p>\n</div></div></div><div id='method-getLayout' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-cfg-layout' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-method-getLayout' class='name expandable'>getLayout</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of layout. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/SampleApp.view.device.Location-cfg-layout\" rel=\"SampleApp.view.device.Location-cfg-layout\" class=\"docClass\">layout</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getTitle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-cfg-title' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-method-getTitle' class='name expandable'>getTitle</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of title. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/SampleApp.view.device.Location-cfg-title\" rel=\"SampleApp.view.device.Location-cfg-title\" class=\"docClass\">title</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-initialize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-method-initialize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-method-initialize' class='name expandable'>initialize</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>override ...</div><div class='long'><p>override</p>\n</div></div></div><div id='method-setLayout' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-cfg-layout' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-method-setLayout' class='name expandable'>setLayout</a>( <span class='pre'>layout</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of layout. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/SampleApp.view.device.Location-cfg-layout\" rel=\"SampleApp.view.device.Location-cfg-layout\" class=\"docClass\">layout</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>layout</span> : String<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setMapLocation' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-method-setMapLocation' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-method-setMapLocation' class='name expandable'>setMapLocation</a>( <span class='pre'>location</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the location on the map component and creates the marker to display it. ...</div><div class='long'><p>Sets the location on the map component and creates the marker to display it.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>location</span> : Object<div class='sub-desc'><p>{Object} Geo reference point composed as:</p>\n<ul><li><span class='pre'>latitude</span> : <div class='sub-desc'><p>{Number} latitude</p>\n</div></li><li><span class='pre'>longitude</span> : <div class='sub-desc'><p>{Number} longitude</p>\n</div></li></ul></div></li></ul></div></div></div><div id='method-setTitle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SampleApp.view.device.Location'>SampleApp.view.device.Location</span><br/><a href='source/Location.html#SampleApp-view-device-Location-cfg-title' target='_blank' class='view-source'>view source</a></div><a href='#!/api/SampleApp.view.device.Location-method-setTitle' class='name expandable'>setTitle</a>( <span class='pre'>title</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of title. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/SampleApp.view.device.Location-cfg-title\" rel=\"SampleApp.view.device.Location-cfg-title\" class=\"docClass\">title</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>title</span> : String<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});