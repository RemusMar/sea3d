﻿/*
*
* Copyright (c) Sunag Entertainment
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
* the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
* FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
* IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

using Poonya.Utils;
using System.Collections.Generic;

namespace Poonya.SEA3D.Objects
{
    public class SEALight : SEAObject3D
    {
        public int color;
        public float multiplier;

        public SEALight(string name, string type)
            : base(name, type)
        {
        }

        protected int WriteLight(ByteArray header)
        {
            int attrib = Write3D(header);



            return attrib;
        }

        override public ByteArray Write()
        {
            ByteArray header = new ByteArray();

            int attrib = WriteLight(header);

            ByteArray data = new ByteArray();

            data.WriteUInt16(attrib);
            data.WriteBytes(header.ToArray());

            data.WriteUInt24(color);
            data.WriteFloat(multiplier);            
            
            return data;
        }
    }
}
