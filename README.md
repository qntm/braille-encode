# braille-encode

Convert binary data to [Braille](http://www.unicode.org/charts/PDF/U2800.pdf) and back. The idea is that the Braille text visually resembles the original binary. For example, the binary sequence 0b11110001 0b10100101 becomes "⣇⢕". Each column represents each nybble, with the most significant bit at the top.

> ⠀⢀⠠⢠⠐⢐⠰⢰⠈⢈⠨⢨⠘⢘⠸⢸<br/>
> ⡀⣀⡠⣠⡐⣐⡰⣰⡈⣈⡨⣨⡘⣘⡸⣸<br/>
> ⠄⢄⠤⢤⠔⢔⠴⢴⠌⢌⠬⢬⠜⢜⠼⢼<br/>
> ⡄⣄⡤⣤⡔⣔⡴⣴⡌⣌⡬⣬⡜⣜⡼⣼<br/>
> ⠂⢂⠢⢢⠒⢒⠲⢲⠊⢊⠪⢪⠚⢚⠺⢺<br/>
> ⡂⣂⡢⣢⡒⣒⡲⣲⡊⣊⡪⣪⡚⣚⡺⣺<br/>
> ⠆⢆⠦⢦⠖⢖⠶⢶⠎⢎⠮⢮⠞⢞⠾⢾<br/>
> ⡆⣆⡦⣦⡖⣖⡶⣶⡎⣎⡮⣮⡞⣞⡾⣾<br/>
> ⠁⢁⠡⢡⠑⢑⠱⢱⠉⢉⠩⢩⠙⢙⠹⢹<br/>
> ⡁⣁⡡⣡⡑⣑⡱⣱⡉⣉⡩⣩⡙⣙⡹⣹<br/>
> ⠅⢅⠥⢥⠕⢕⠵⢵⠍⢍⠭⢭⠝⢝⠽⢽<br/>
> ⡅⣅⡥⣥⡕⣕⡵⣵⡍⣍⡭⣭⡝⣝⡽⣽<br/>
> ⠃⢃⠣⢣⠓⢓⠳⢳⠋⢋⠫⢫⠛⢛⠻⢻<br/>
> ⡃⣃⡣⣣⡓⣓⡳⣳⡋⣋⡫⣫⡛⣛⡻⣻<br/>
> ⠇⢇⠧⢧⠗⢗⠷⢷⠏⢏⠯⢯⠟⢟⠿⢿<br/>
> ⡇⣇⡧⣧⡗⣗⡷⣷⡏⣏⡯⣯⡟⣟⡿⣿<br/>

This is a hijacking/repurposing of Braille in the same way that Base64 repurposes alphanumeric ASCII — it is most likely of no use to Braille users. Or to anybody, for that matter. For an actual Braille module, try [`braille`](https://www.npmjs.com/package/braille).

## Installation

```bash
npm install braille-encode
```

## Usage

```js
var brailleEncode = require("braille-encode");

var buf = new Buffer("d41d8cd98f00b204e9800998ecf8427e", "hex");

var str = brailleEncode.encode(buf); 
console.log(str); // "⡓⣘⠙⣋⢹⠀⡥⠐⢏⠁⢈⡉⠟⡏⠢⡾"

var buf2 = brailleEncode.decode(str);
console.log(buf.equals(buf2)); // true
```

## Efficiency

Given 1MB of input, `braille-encode` returns 3.00MB of UTF-8, 2.00MB of UTF-16 or 4.00MB of UTF-32.

Compare Base64, which returns 1.33MB of UTF-8, 2.67MB of UTF-16 or 5.33MB of UTF-32.

## Notes on dot numbering and significance

I numbered the eight Braille dots as follows:

    8 4
    7 3
    6 2
    5 1

Each dot, if filled, has the following significance:

    128  8
     64  4
     32  2
     16  1

Note that this is different from how Braille conventionally numbers the dots. Braille has:

    1 4
    2 5
    3 6
    7 8

Which would suggest that the significance of each dot is:

     1    8
     2   16
     4   32
    64  128

For example, the byte 0b11110000 would be represented as "⣰". However, this would be relatively difficult to understand. Since [the Unicode chart](http://www.unicode.org/charts/PDF/U2800.pdf) uses this ordering, this means encoding/decoding *isn't* a matter of simply taking the hex and adding/subtracting 0x2800.
