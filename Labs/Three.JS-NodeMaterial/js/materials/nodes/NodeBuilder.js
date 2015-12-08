/**
 * @author sunag / http://www.sunag.com.br/
 */

THREE.NodeBuilder = function( material ) {
	
	this.material = material;
	this.isVerify = false;
	this.cache = '';
	
};

THREE.NodeBuilder.prototype = {
	constructor: THREE.NodeBuilder,

	include : function ( func ) {
		
		this.material.include( this.shader, func );

	},
	
	getFormatConstructor : function ( name ) {
		
		return THREE.NodeBuilder.constructors[len-1];
	
	},
	
	getFormat : function ( format ) {
		
		return format.replace('c','v3').replace(/fv1|iv1/, 'v1');
	
	},
	
	getFormatLength : function ( format ) {
		
		return parseInt( this.getFormat(format).substr(1) );
	
	},
	
	getFormatByLength : function ( len ) {
		
		if (len == 1) return 'fv1';
		
		return 'v' + len;
	
	},
	
	format : function ( code, from, to ) {
		
		var format = this.getFormat(from + '=' + to);
	
		switch ( format ) {
			case 'v1=v2': return 'vec2(' + code + ')';
			case 'v1=v3': return 'vec3(' + code + ')';
			case 'v1=v4': return 'vec4(' + code + ')';
			
			case 'v2=v1': return code + '.x';
			case 'v2=v3': return 'vec3(' + code + ',0.0)';
			case 'v2=v4': return 'vec4(' + code + ',0.0,0.0)';
			
			case 'v3=v1': return code + '.x';
			case 'v3=v2': return code + '.xy';
			case 'v3=v4': return 'vec4(' + code + ',0.0)';
			
			case 'v4=v1': return code + '.x';
			case 'v4=v2': return code + '.xy';
			case 'v4=v3': return code + '.xyz';
		}
		
		return code;
	
	},
	
	getType : function ( format ) {
		
		return THREE.NodeBuilder.type[ format ];
	
	},
	
	getUuid : function ( uuid ) {
		
		if (this.cache) uuid = this.cache + '-' + uuid;
		
		return uuid;

	},
	
	setCache : function ( name ) {
		
		this.cache = name || '';
		
		return this;

	},
	
	getElementByIndex : function ( index ) {
		
		return THREE.NodeBuilder.elements[ index ];
	
	},
	
	getElementIndex : function ( elm ) {
		
		return THREE.NodeBuilder.elements.indexOf( elm );
	
	},
	
	isShader : function ( shader ) {
		
		return this.shader == shader || this.isVerify;

	},
	
	setShader : function ( shader ) {
		
		this.shader = shader;
		
		return this;

	}
};

THREE.NodeBuilder.type = {
	float : 'fv1',
	vec2 : 'v2',
	vec3 : 'v3',
	vec4 : 'v4'
};

THREE.NodeBuilder.constructors = [
	'', 
	'vec2', 
	'vec3', 
	'vec4'
];

THREE.NodeBuilder.elements = [
	'x', 
	'y', 
	'z', 
	'w'
];