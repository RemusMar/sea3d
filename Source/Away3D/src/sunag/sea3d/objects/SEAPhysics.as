package sunag.sea3d.objects
{
	import flash.geom.Matrix3D;
	import flash.utils.ByteArray;
	
	import sunag.sea3d.SEA;
	import sunag.utils.ByteArrayUtils;
	
	public class SEAPhysics extends SEAObject
	{
		public static const TYPE:String = "phy";
		
		public var attrib:int;
		
		public var shape:SEAObject;//SEAShape
		
		public var target:SEAObject;//SEAObject3D
		public var transform:Matrix3D;
		public var offset:Matrix3D;
		
		public var animations:Array;	
		public var scripts:Array;
		public var properties:SEAObject;//SEAProperties
		public var clazz:SEAObject;//SEAClass
		
		public function SEAPhysics(name:String, type:String, sea:SEA)
		{
			super(name, type, sea);
		}
		
		override public function load():void
		{
			attrib = data.readUnsignedShort();
			
			shape = sea.getSEAObject( data.readUnsignedInt() );
			
			if (attrib & 1)			
				target = sea.getSEAObject( data.readUnsignedInt() );			
			else			
				transform = ByteArrayUtils.readMatrix3D(data);			
			
			if (attrib & 2)
				offset = ByteArrayUtils.readMatrix3D(data);	
			
			if (attrib & 4)			
				scripts = SEAScript.readScriptList(data, sea);			
			
			if (attrib & 8)
				clazz = sea.getSEAObject(data.readUnsignedInt());
			
			if (attrib & 16)
				properties = sea.getSEAObject(data.readUnsignedInt());
			
			read(data);
			
			var numTag:int = data.readUnsignedByte();
			
			for (var i:int=0;i<numTag;++i)
			{
				var kind:uint = data.readUnsignedShort();
				var size:uint = data.readUnsignedInt();				
				var pos:uint = data.position;
				
				if (!readTag(kind, data, size))				
					trace("Tag 0x" + kind.toString(16) + " was not found in the object \"" + filename + "\".");				
				
				data.position = pos += size;
			}
		}
		
		protected function read(data:ByteArray):void
		{			
		}
		
		protected function readTag(kind:uint, data:ByteArray, size:uint):Boolean
		{
			return false;		
		}
	}
}