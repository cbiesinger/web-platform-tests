
function getTestData() {

    // deriveBits and deriveKey take as input:
    // - password (actually, a CryptoKey representing a password)
    // - salt (BufferSource)
    // - hash (which one to use)
    // - iterations (how many times to use it)

    // deriveBits also takes a length. deriveKey uses the length of the output key
    // - length is the number of bits, NOT octets, but it MUST be a multiple of 8
    // - note that result of length(n) is first n bits of length(m) if m>n

    // Variations to test:
    // - empty, short, and fairly long password
    // - empty, short, and fairly long salt
    // - SHA-1, SHA-256, SHA-384, SHA-512 hash
    // - 1, 1000, and 100000 million iterations

    // Test cases to generate: 3 * 3 * 4 * 3 = 108

    // Error conditions to test:
    // - length null (OperationError)
    // - length not a multiple of 8 (OperationError)
    // - illegal name for hash algorithm (NotSupportedError)
    // - legal algorithm name but not digest one (e.g., AES-CBC) (NotSupportedError)
    // - baseKey usages missing "deriveBits" (InvalidAccessError)
    // - baseKey algorithm does not match PBKDF2 (InvalidAccessError)
    // - 0 iterations

    var derivedKeyTypes = [
        {algorithm: {name: "AES-CBC", length: 128}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CBC", length: 192}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CBC", length: 256}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CTR", length: 128}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CTR", length: 192}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-CTR", length: 256}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-GCM", length: 128}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-GCM", length: 192}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-GCM", length: 256}, usages: ["encrypt", "decrypt"]},
        {algorithm: {name: "AES-KW", length: 128}, usages: ["wrapKey", "unwrapKey"]},
        {algorithm: {name: "AES-KW", length: 192}, usages: ["wrapKey", "unwrapKey"]},
        {algorithm: {name: "AES-KW", length: 256}, usages: ["wrapKey", "unwrapKey"]},
        {algorithm: {name: "HMAC", hash: "SHA-1", length: 256}, usages: ["sign", "verify"]},
        {algorithm: {name: "HMAC", hash: "SHA-256", length: 256}, usages: ["sign", "verify"]},
        {algorithm: {name: "HMAC", hash: "SHA-384", length: 256}, usages: ["sign", "verify"]},
        {algorithm: {name: "HMAC", hash: "SHA-512", length: 256}, usages: ["sign", "verify"]}
    ];

    var passwords = {
        "short": new Uint8Array([80, 64, 115, 115, 119, 48, 114, 100]),
        "long": new Uint8Array([85, 115, 101, 114, 115, 32, 115, 104, 111, 117, 108, 100, 32, 112, 105, 99, 107, 32, 108, 111, 110, 103, 32, 112, 97, 115, 115, 112, 104, 114, 97, 115, 101, 115, 32, 40, 110, 111, 116, 32, 117, 115, 101, 32, 115, 104, 111, 114, 116, 32, 112, 97, 115, 115, 119, 111, 114, 100, 115, 41, 33]),
        "empty": new Uint8Array([])
    };

    var salts = {
        "short": new Uint8Array([78, 97, 67, 108]),
        "long": new Uint8Array([83, 111, 100, 105, 117, 109, 32, 67, 104, 108, 111, 114, 105, 100, 101, 32, 99, 111, 109, 112, 111, 117, 110, 100]),
        "empty": new Uint8Array([])
    };

    var derivations = {
        "short": {
            "short": {
                "SHA-384": {
                    "1000": new Uint8Array([170, 236, 90, 151, 109, 77, 53, 203, 32, 36, 72, 111, 201, 249, 187, 154, 163, 234, 231, 206, 242, 188, 230, 38, 100, 181, 179, 117, 28, 245, 15, 241]),
                    "1": new Uint8Array([128, 205, 15, 21, 54, 67, 102, 167, 37, 81, 195, 121, 117, 247, 182, 55, 186, 137, 194, 155, 70, 57, 236, 114, 15, 105, 167, 13, 187, 237, 81, 92]),
                    "100000": new Uint8Array([111, 94, 163, 198, 198, 245, 228, 131, 52, 103, 180, 124, 58, 103, 30, 101, 113, 78, 135, 7, 27, 209, 227, 109, 113, 111, 132, 107, 92, 210, 137, 128])
                },
                "SHA-512": {
                    "1000": new Uint8Array([134, 92, 89, 69, 225, 31, 91, 243, 221, 240, 2, 231, 203, 23, 72, 246, 34, 77, 38, 113, 232, 6, 218, 212, 170, 240, 144, 160, 67, 103, 218, 41]),
                    "1": new Uint8Array([105, 244, 213, 206, 245, 199, 216, 186, 147, 142, 136, 3, 136, 200, 246, 59, 107, 36, 72, 178, 98, 109, 19, 67, 252, 92, 182, 139, 189, 127, 39, 178]),
                    "100000": new Uint8Array([72, 59, 167, 242, 226, 254, 56, 44, 246, 29, 32, 178, 152, 18, 226, 212, 150, 16, 166, 0, 65, 174, 64, 236, 249, 252, 126, 241, 56, 233, 56, 118])
                },
                "SHA-1": {
                    "1000": new Uint8Array([83, 136, 234, 94, 98, 225, 181, 87, 152, 26, 190, 92, 228, 19, 33, 39, 88, 170, 106, 157, 44, 91, 240, 140, 1, 157, 69, 157, 186, 102, 107, 144]),
                    "1": new Uint8Array([70, 36, 219, 210, 19, 115, 238, 86, 89, 193, 37, 177, 132, 238, 218, 162, 106, 51, 183, 124, 161, 19, 20, 185, 240, 201, 218, 225, 228, 78, 155, 4]),
                    "100000": new Uint8Array([245, 143, 67, 95, 188, 92, 5, 134, 92, 145, 79, 217, 114, 16, 138, 9, 69, 125, 95, 154, 72, 241, 78, 117, 228, 204, 2, 217, 137, 131, 3, 138])
                },
                "SHA-256": {
                    "1000": new Uint8Array([78, 108, 165, 121, 87, 67, 155, 227, 167, 83, 112, 66, 66, 37, 226, 33, 29, 85, 240, 90, 240, 5, 97, 223, 63, 62, 254, 233, 17, 107, 195, 76]),
                    "1": new Uint8Array([198, 188, 85, 164, 4, 173, 206, 163, 106, 26, 181, 103, 152, 8, 94, 10, 175, 105, 127, 107, 178, 193, 106, 80, 114, 248, 56, 241, 125, 254, 108, 182]),
                    "100000": new Uint8Array([171, 37, 121, 101, 152, 231, 75, 41, 195, 36, 245, 186, 77, 144, 234, 125, 200, 159, 198, 137, 16, 65, 180, 213, 108, 148, 21, 101, 5, 247, 34, 192])
                }
            },
            "long": {
                "SHA-384": {
                    "1000": new Uint8Array([163, 16, 239, 60, 107, 58, 149, 230, 216, 202, 102, 68, 227, 220, 253, 136, 34, 42, 89, 254, 142, 0, 197, 45, 106, 18, 99, 29, 130, 193, 210, 75]),
                    "1": new Uint8Array([104, 7, 52, 108, 197, 62, 222, 209, 203, 150, 74, 114, 98, 133, 137, 166, 189, 72, 53, 89, 144, 191, 223, 231, 70, 81, 9, 113, 2, 7, 5, 157]),
                    "100000": new Uint8Array([44, 140, 102, 116, 200, 121, 207, 24, 80, 188, 155, 127, 189, 204, 110, 167, 171, 176, 161, 82, 33, 150, 168, 102, 135, 83, 5, 222, 165, 116, 134, 243])
                },
                "SHA-512": {
                    "1000": new Uint8Array([156, 23, 254, 150, 137, 94, 173, 191, 209, 204, 9, 95, 193, 187, 131, 79, 40, 229, 204, 201, 236, 150, 202, 129, 76, 255, 148, 26, 75, 244, 7, 39]),
                    "1": new Uint8Array([87, 119, 2, 122, 255, 64, 81, 251, 155, 67, 193, 241, 239, 4, 99, 189, 103, 117, 17, 117, 212, 40, 161, 61, 163, 218, 132, 90, 89, 19, 50, 205]),
                    "100000": new Uint8Array([180, 121, 201, 113, 92, 66, 22, 56, 220, 224, 167, 5, 252, 11, 123, 167, 213, 111, 163, 6, 49, 136, 6, 53, 128, 224, 112, 223, 241, 219, 73, 124])
                },
                "SHA-1": {
                    "1000": new Uint8Array([137, 211, 178, 123, 95, 110, 138, 240, 21, 242, 248, 124, 243, 104, 161, 67, 138, 32, 108, 78, 207, 95, 230, 129, 252, 59, 249, 76, 86, 33, 62, 246]),
                    "1": new Uint8Array([87, 111, 124, 22, 88, 37, 190, 249, 239, 20, 180, 188, 44, 130, 70, 157, 30, 64, 143, 248, 231, 186, 48, 102, 148, 121, 127, 158, 69, 183, 102, 237]),
                    "100000": new Uint8Array([30, 57, 232, 191, 102, 118, 252, 211, 21, 102, 85, 69, 122, 250, 20, 190, 231, 113, 219, 203, 252, 208, 114, 65, 199, 206, 226, 9, 167, 203, 31, 233])
                },
                "SHA-256": {
                    "1000": new Uint8Array([177, 167, 183, 220, 32, 223, 23, 74, 74, 14, 65, 13, 191, 175, 3, 180, 195, 117, 196, 80, 168, 157, 122, 158, 211, 73, 180, 229, 46, 100, 223, 216]),
                    "1": new Uint8Array([18, 185, 15, 89, 79, 9, 8, 207, 145, 45, 101, 92, 148, 143, 156, 42, 30, 171, 133, 87, 101, 188, 18, 120, 94, 241, 138, 160, 43, 142, 126, 220]),
                    "100000": new Uint8Array([212, 89, 77, 138, 27, 89, 82, 10, 72, 135, 137, 34, 166, 93, 102, 61, 40, 246, 165, 250, 73, 233, 49, 211, 0, 216, 249, 186, 249, 61, 10, 235])
                }
            },
            "empty": {
                "SHA-384": {
                    "1000": new Uint8Array([174, 181, 249, 125, 102, 39, 238, 188, 222, 107, 19, 154, 0, 137, 85, 0, 48, 247, 64, 28, 103, 224, 28, 5, 122, 51, 56, 23, 94, 63, 58, 23]),
                    "1": new Uint8Array([79, 16, 137, 192, 30, 67, 139, 222, 100, 154, 55, 159, 164, 24, 251, 195, 184, 86, 37, 135, 114, 223, 233, 17, 128, 111, 155, 208, 128, 159, 188, 126]),
                    "100000": new Uint8Array([215, 104, 125, 246, 199, 129, 220, 136, 214, 78, 249, 203, 175, 149, 211, 213, 209, 21, 95, 102, 178, 48, 35, 158, 110, 129, 193, 85, 12, 136, 64, 207])
                },
                "SHA-512": {
                    "1000": new Uint8Array([181, 172, 114, 11, 122, 190, 8, 50, 252, 81, 163, 27, 30, 197, 103, 59, 235, 30, 65, 132, 10, 223, 211, 214, 6, 232, 99, 143, 64, 6, 235, 72]),
                    "1": new Uint8Array([143, 123, 125, 69, 156, 117, 47, 100, 191, 18, 190, 98, 91, 101, 212, 150, 172, 36, 234, 54, 81, 107, 22, 142, 22, 251, 2, 104, 69, 180, 232, 46]),
                    "100000": new Uint8Array([186, 26, 15, 54, 186, 215, 113, 82, 101, 100, 5, 30, 185, 202, 32, 125, 161, 155, 98, 229, 55, 98, 52, 153, 118, 169, 163, 209, 176, 239, 126, 32])
                },
                "SHA-1": {
                    "1000": new Uint8Array([115, 111, 60, 61, 110, 188, 194, 167, 185, 112, 64, 62, 38, 150, 192, 235, 76, 209, 119, 15, 85, 241, 150, 252, 112, 137, 230, 102, 193, 31, 119, 218]),
                    "1": new Uint8Array([192, 207, 251, 12, 229, 219, 53, 31, 170, 36, 218, 213, 144, 37, 131, 207, 195, 10, 159, 84, 217, 170, 105, 145, 254, 130, 29, 3, 18, 33, 39, 233]),
                    "100000": new Uint8Array([28, 80, 149, 172, 154, 123, 212, 16, 239, 15, 114, 201, 147, 236, 169, 27, 176, 229, 113, 233, 178, 251, 171, 112, 79, 140, 19, 17, 145, 250, 209, 108])
                },
                "SHA-256": {
                    "1000": new Uint8Array([185, 210, 242, 33, 123, 78, 229, 168, 191, 3, 69, 243, 107, 44, 152, 135, 51, 245, 3, 169, 117, 223, 234, 199, 183, 19, 95, 84, 165, 242, 153, 113]),
                    "1": new Uint8Array([1, 158, 84, 171, 66, 240, 4, 133, 211, 170, 27, 38, 252, 222, 33, 174, 95, 82, 203, 15, 9, 96, 255, 201, 118, 127, 37, 198, 94, 45, 178, 249]),
                    "100000": new Uint8Array([167, 162, 134, 152, 41, 121, 120, 7, 179, 229, 118, 193, 120, 120, 180, 102, 68, 158, 137, 230, 4, 71, 213, 65, 119, 90, 150, 235, 124, 26, 93, 237])
                }
            }
        },
        "long": {
            "short": {
                "SHA-384": {
                    "1000": new Uint8Array([250, 164, 66, 251, 171, 244, 5, 140, 198, 83, 104, 181, 61, 126, 197, 17, 60, 9, 234, 126, 94, 55, 67, 49, 47, 75, 235, 237, 217, 128, 186, 55]),
                    "1": new Uint8Array([94, 222, 136, 54, 253, 171, 238, 197, 211, 115, 59, 67, 74, 186, 196, 67, 212, 21, 25, 59, 89, 158, 9, 38, 25, 59, 0, 15, 64, 106, 90, 125]),
                    "100000": new Uint8Array([246, 42, 230, 199, 135, 27, 24, 26, 167, 18, 50, 245, 235, 136, 55, 36, 152, 239, 50, 172, 10, 125, 113, 81, 25, 232, 240, 82, 235, 16, 45, 41])
                },
                "SHA-512": {
                    "1000": new Uint8Array([240, 146, 143, 80, 161, 85, 242, 106, 140, 156, 27, 199, 243, 181, 203, 83, 28, 83, 168, 245, 16, 64, 201, 206, 95, 199, 157, 67, 15, 240, 192, 244]),
                    "1": new Uint8Array([62, 156, 18, 179, 246, 223, 182, 68, 21, 148, 236, 112, 99, 252, 169, 98, 255, 218, 16, 182, 207, 48, 184, 152, 163, 30, 249, 241, 48, 107, 17, 25]),
                    "100000": new Uint8Array([151, 74, 207, 187, 15, 15, 32, 200, 30, 201, 40, 41, 243, 140, 61, 175, 8, 106, 125, 245, 139, 145, 43, 133, 109, 31, 94, 204, 147, 85, 239, 27])
                },
                "SHA-1": {
                    "1000": new Uint8Array([83, 180, 33, 97, 19, 78, 21, 200, 113, 171, 215, 26, 186, 19, 144, 208, 31, 76, 106, 148, 12, 170, 245, 193, 121, 37, 141, 143, 27, 29, 104, 11]),
                    "1": new Uint8Array([138, 231, 47, 148, 230, 252, 213, 79, 203, 252, 166, 98, 0, 162, 17, 165, 27, 47, 132, 103, 135, 210, 11, 104, 8, 190, 223, 21, 108, 228, 108, 160]),
                    "100000": new Uint8Array([167, 253, 164, 199, 157, 211, 186, 26, 135, 95, 101, 233, 36, 139, 33, 8, 153, 202, 8, 20, 174, 56, 153, 93, 140, 229, 165, 53, 96, 203, 172, 49])
                },
                "SHA-256": {
                    "1000": new Uint8Array([238, 235, 119, 20, 66, 10, 0, 177, 138, 206, 194, 181, 151, 157, 29, 166, 19, 115, 32, 43, 127, 139, 167, 27, 8, 98, 147, 170, 184, 89, 224, 160]),
                    "1": new Uint8Array([255, 161, 233, 167, 39, 169, 44, 39, 174, 111, 116, 177, 199, 151, 143, 158, 26, 248, 96, 225, 6, 55, 99, 64, 172, 67, 217, 105, 209, 54, 64, 91]),
                    "100000": new Uint8Array([222, 172, 112, 203, 227, 241, 114, 14, 53, 59, 78, 128, 22, 221, 181, 148, 117, 239, 183, 11, 106, 35, 133, 231, 53, 210, 214, 234, 109, 98, 74, 77])
                }
            },
            "long": {
                "SHA-384": {
                    "1000": new Uint8Array([53, 101, 133, 81, 240, 236, 19, 57, 138, 123, 69, 224, 38, 28, 253, 101, 76, 30, 82, 65, 30, 110, 69, 125, 238, 104, 244, 174, 171, 233, 37, 167]),
                    "1": new Uint8Array([207, 85, 66, 44, 239, 110, 27, 196, 158, 109, 8, 43, 34, 115, 212, 128, 232, 242, 232, 130, 45, 173, 209, 70, 156, 42, 50, 217, 101, 125, 18, 241]),
                    "100000": new Uint8Array([26, 186, 181, 241, 228, 97, 223, 55, 139, 136, 192, 162, 43, 231, 110, 242, 241, 98, 125, 247, 74, 199, 203, 251, 132, 189, 204, 179, 84, 188, 136, 137])
                },
                "SHA-512": {
                    "1000": new Uint8Array([67, 225, 32, 36, 196, 211, 84, 114, 127, 126, 88, 132, 44, 203, 96, 51, 161, 97, 214, 13, 197, 174, 81, 111, 7, 110, 74, 88, 161, 136, 13, 56]),
                    "1": new Uint8Array([222, 74, 251, 192, 173, 211, 228, 211, 47, 75, 198, 225, 34, 168, 138, 228, 74, 43, 60, 207, 1, 72, 231, 118, 43, 172, 5, 196, 62, 148, 239, 127]),
                    "100000": new Uint8Array([249, 169, 35, 132, 164, 234, 223, 195, 86, 6, 73, 179, 127, 182, 118, 232, 60, 69, 60, 187, 217, 159, 128, 187, 166, 240, 161, 14, 189, 21, 11, 82])
                },
                "SHA-1": {
                    "1000": new Uint8Array([110, 144, 200, 110, 224, 123, 135, 62, 150, 80, 113, 2, 86, 115, 255, 5, 66, 159, 103, 140, 48, 249, 27, 55, 225, 226, 218, 81, 32, 54, 211, 32]),
                    "1": new Uint8Array([29, 16, 78, 165, 210, 53, 0, 106, 18, 168, 15, 113, 184, 14, 229, 40, 4, 139, 100, 204, 26, 122, 15, 48, 247, 223, 75, 162, 107, 131, 32, 199]),
                    "100000": new Uint8Array([20, 16, 48, 118, 59, 249, 131, 200, 86, 77, 93, 76, 147, 95, 227, 202, 53, 73, 96, 129, 89, 172, 25, 52, 193, 89, 144, 64, 102, 140, 35, 99])
                },
                "SHA-256": {
                    "1000": new Uint8Array([63, 213, 135, 201, 75, 169, 70, 184, 185, 220, 205, 221, 42, 91, 116, 246, 119, 141, 79, 97, 230, 145, 248, 58, 196, 122, 47, 169, 88, 11, 253, 248]),
                    "1": new Uint8Array([253, 92, 174, 184, 179, 171, 229, 137, 188, 21, 156, 78, 81, 248, 0, 87, 14, 116, 246, 67, 151, 166, 197, 238, 19, 29, 254, 217, 63, 5, 17, 170]),
                    "100000": new Uint8Array([17, 153, 45, 139, 129, 51, 17, 36, 76, 84, 75, 98, 41, 41, 69, 226, 8, 212, 3, 206, 189, 107, 149, 82, 161, 165, 98, 6, 93, 153, 88, 234])
                }
            },
            "empty": {
                "SHA-384": {
                    "1000": new Uint8Array([249, 202, 20, 139, 12, 4, 24, 144, 191, 248, 131, 29, 182, 23, 71, 25, 126, 148, 206, 104, 241, 144, 237, 242, 105, 105, 75, 77, 100, 72, 97, 202]),
                    "1": new Uint8Array([73, 171, 63, 159, 136, 47, 219, 158, 82, 139, 77, 159, 27, 62, 140, 113, 210, 99, 154, 191, 23, 1, 213, 110, 185, 155, 213, 18, 1, 228, 32, 255]),
                    "100000": new Uint8Array([23, 73, 223, 205, 119, 229, 37, 133, 25, 234, 34, 49, 186, 44, 214, 84, 59, 7, 51, 57, 172, 155, 21, 69, 187, 100, 49, 83, 250, 246, 209, 123])
                },
                "SHA-512": {
                    "1000": new Uint8Array([69, 122, 121, 85, 235, 236, 236, 113, 165, 30, 251, 98, 55, 229, 177, 214, 47, 77, 234, 181, 201, 61, 123, 61, 17, 209, 231, 15, 175, 250, 65, 126]),
                    "1": new Uint8Array([209, 191, 161, 166, 184, 169, 119, 131, 159, 140, 63, 157, 82, 221, 2, 16, 78, 32, 41, 192, 235, 42, 98, 8, 204, 64, 136, 22, 231, 118, 138, 140]),
                    "100000": new Uint8Array([232, 5, 172, 156, 193, 216, 65, 44, 66, 68, 109, 35, 125, 27, 80, 79, 149, 64, 179, 98, 189, 27, 117, 228, 81, 83, 30, 133, 62, 36, 117, 61])
                },
                "SHA-1": {
                    "1000": new Uint8Array([231, 55, 93, 229, 3, 103, 102, 196, 12, 184, 95, 67, 181, 63, 206, 79, 250, 64, 42, 182, 190, 53, 113, 0, 126, 245, 213, 84, 83, 253, 127, 10]),
                    "1": new Uint8Array([164, 106, 98, 152, 109, 156, 57, 9, 244, 16, 20, 221, 114, 207, 227, 74, 38, 18, 71, 133, 77, 115, 18, 207, 79, 190, 173, 96, 185, 182, 158, 221]),
                    "100000": new Uint8Array([122, 64, 61, 154, 19, 174, 216, 22, 78, 156, 7, 44, 84, 84, 98, 37, 31, 217, 66, 241, 115, 106, 107, 240, 60, 225, 200, 131, 48, 4, 142, 4])
                },
                "SHA-256": {
                    "1000": new Uint8Array([126, 102, 200, 75, 234, 136, 143, 146, 195, 72, 217, 20, 85, 133, 24, 108, 174, 71, 43, 18, 251, 167, 240, 173, 40, 23, 149, 117, 193, 170, 129, 90]),
                    "1": new Uint8Array([79, 81, 12, 81, 129, 172, 92, 44, 95, 212, 189, 20, 31, 151, 18, 73, 91, 236, 162, 121, 98, 71, 66, 180, 214, 211, 13, 8, 185, 108, 10, 105]),
                    "100000": new Uint8Array([95, 26, 106, 196, 165, 109, 151, 150, 167, 48, 154, 120, 218, 170, 249, 24, 186, 218, 245, 237, 30, 236, 195, 240, 184, 163, 164, 76, 61, 56, 214, 84])
                }
            }
        },
        "empty": {
            "short": {
                "SHA-384": {
                    "1000": new Uint8Array([127, 247, 149, 74, 237, 223, 65, 121, 95, 200, 48, 6, 102, 120, 109, 73, 116, 38, 154, 169, 28, 199, 233, 56, 17, 201, 83, 51, 29, 86, 214, 9]),
                    "1": new Uint8Array([233, 240, 218, 30, 151, 223, 164, 85, 248, 88, 206, 107, 154, 241, 236, 192, 41, 159, 18, 95, 241, 168, 71, 235, 93, 73, 85, 134, 111, 67, 230, 4]),
                    "100000": new Uint8Array([28, 115, 19, 43, 106, 85, 233, 217, 222, 44, 219, 254, 31, 85, 191, 10, 181, 159, 217, 31, 120, 241, 9, 197, 0, 150, 3, 139, 133, 87, 177, 71])
                },
                "SHA-512": {
                    "1000": new Uint8Array([213, 97, 196, 200, 78, 156, 96, 186, 71, 82, 162, 211, 131, 191, 85, 239, 246, 67, 252, 158, 69, 34, 82, 214, 130, 30, 57, 68, 147, 80, 207, 114]),
                    "1": new Uint8Array([231, 226, 180, 31, 72, 135, 66, 27, 203, 118, 78, 180, 165, 111, 99, 210, 80, 46, 51, 199, 100, 251, 223, 96, 98, 106, 212, 46, 217, 103, 35, 66]),
                    "100000": new Uint8Array([239, 208, 7, 82, 188, 159, 250, 251, 90, 57, 157, 209, 213, 131, 78, 141, 44, 43, 103, 110, 205, 75, 32, 99, 251, 31, 229, 129, 208, 241, 56, 11])
                },
                "SHA-1": {
                    "1000": new Uint8Array([114, 201, 43, 189, 61, 218, 180, 120, 158, 136, 228, 42, 209, 205, 168, 60, 192, 114, 158, 108, 181, 16, 106, 87, 126, 80, 213, 207, 97, 120, 36, 129]),
                    "1": new Uint8Array([166, 103, 218, 71, 184, 248, 87, 183, 198, 95, 112, 166, 200, 231, 160, 108, 224, 210, 82, 17, 162, 182, 235, 175, 88, 220, 170, 242, 104, 180, 107, 29]),
                    "100000": new Uint8Array([6, 225, 158, 27, 131, 230, 72, 11, 21, 84, 223, 43, 49, 162, 201, 45, 27, 252, 249, 188, 27, 219, 200, 117, 31, 248, 104, 91, 222, 239, 125, 201])
                },
                "SHA-256": {
                    "1000": new Uint8Array([40, 53, 243, 237, 83, 86, 84, 32, 201, 9, 81, 80, 155, 12, 17, 115, 182, 69, 23, 79, 21, 70, 171, 58, 195, 230, 200, 92, 180, 113, 181, 59]),
                    "1": new Uint8Array([45, 219, 73, 36, 62, 179, 181, 145, 44, 178, 96, 205, 216, 127, 176, 78, 240, 209, 17, 191, 164, 77, 64, 164, 94, 2, 168, 165, 195, 193, 81, 141]),
                    "100000": new Uint8Array([128, 174, 217, 5, 202, 50, 174, 11, 178, 169, 216, 245, 50, 240, 72, 160, 230, 114, 70, 62, 239, 159, 131, 223, 167, 216, 139, 202, 114, 101, 83, 234])
                }
            },
            "long": {
                "SHA-384": {
                    "1000": new Uint8Array([139, 184, 156, 247, 25, 114, 254, 90, 204, 22, 253, 197, 248, 207, 253, 44, 46, 113, 120, 192, 134, 179, 187, 230, 28, 193, 49, 70, 25, 19, 89, 88]),
                    "1": new Uint8Array([123, 11, 204, 168, 29, 214, 55, 163, 179, 57, 134, 102, 97, 151, 22, 197, 242, 177, 244, 165, 194, 78, 133, 193, 138, 153, 85, 85, 158, 77, 118, 146]),
                    "100000": new Uint8Array([38, 198, 168, 174, 75, 209, 251, 231, 21, 174, 71, 142, 255, 243, 236, 174, 131, 175, 166, 23, 237, 53, 189, 74, 63, 99, 195, 218, 118, 164, 45, 34])
                },
                "SHA-512": {
                    "1000": new Uint8Array([92, 172, 193, 108, 223, 190, 5, 44, 253, 115, 169, 137, 27, 140, 14, 120, 177, 155, 46, 7, 234, 226, 66, 61, 72, 254, 213, 224, 138, 168, 73, 75]),
                    "1": new Uint8Array([187, 115, 248, 22, 138, 143, 57, 29, 61, 84, 202, 137, 47, 183, 43, 142, 96, 53, 227, 127, 137, 30, 90, 112, 73, 27, 148, 220, 5, 81, 11, 196]),
                    "100000": new Uint8Array([135, 253, 252, 41, 51, 146, 203, 243, 62, 204, 155, 81, 65, 162, 254, 250, 116, 209, 80, 73, 151, 86, 134, 60, 72, 76, 10, 120, 182, 39, 77, 127])
                },
                "SHA-1": {
                    "1000": new Uint8Array([204, 87, 72, 236, 196, 18, 136, 160, 225, 51, 104, 84, 58, 170, 46, 246, 44, 151, 186, 117, 24, 250, 136, 246, 225, 28, 53, 118, 63, 201, 48, 180]),
                    "1": new Uint8Array([31, 70, 180, 12, 242, 251, 61, 196, 26, 61, 156, 237, 136, 151, 184, 97, 5, 3, 104, 16, 226, 191, 172, 112, 64, 129, 75, 214, 93, 66, 141, 103]),
                    "100000": new Uint8Array([51, 226, 153, 59, 244, 114, 157, 201, 147, 255, 246, 110, 105, 204, 85, 119, 113, 53, 235, 250, 188, 229, 51, 87, 91, 206, 74, 150, 100, 90, 116, 44])
                },
                "SHA-256": {
                    "1000": new Uint8Array([19, 83, 247, 69, 130, 55, 171, 51, 46, 224, 82, 226, 159, 130, 154, 42, 185, 14, 114, 99, 14, 161, 4, 147, 180, 238, 207, 251, 159, 248, 158, 29]),
                    "1": new Uint8Array([97, 201, 53, 196, 98, 195, 50, 28, 137, 102, 53, 69, 209, 58, 79, 107, 82, 181, 25, 28, 251, 116, 121, 229, 141, 207, 230, 68, 77, 67, 16, 108]),
                    "100000": new Uint8Array([121, 186, 248, 14, 197, 130, 146, 5, 56, 128, 30, 157, 146, 156, 224, 112, 132, 39, 121, 135, 72, 141, 115, 58, 2, 104, 82, 196, 82, 240, 111, 180])
                }
            },
            "empty": {
                "SHA-384": {
                    "1000": new Uint8Array([156, 191, 231, 45, 25, 77, 163, 78, 23, 200, 33, 221, 21, 105, 239, 80, 168, 110, 180, 216, 147, 89, 23, 118, 173, 198, 165, 194, 30, 0, 49, 207]),
                    "1": new Uint8Array([75, 176, 66, 165, 194, 140, 238, 111, 102, 249, 145, 199, 23, 253, 119, 2, 103, 120, 126, 43, 179, 3, 30, 174, 39, 13, 135, 214, 58, 217, 149, 52]),
                    "100000": new Uint8Array([237, 107, 215, 40, 37, 103, 171, 228, 141, 84, 45, 6, 125, 9, 244, 4, 189, 4, 74, 226, 206, 254, 17, 218, 204, 83, 28, 71, 100, 205, 53, 205])
                },
                "SHA-512": {
                    "1000": new Uint8Array([203, 147, 9, 108, 58, 2, 190, 235, 28, 95, 172, 54, 118, 92, 144, 17, 254, 153, 248, 216, 234, 98, 54, 96, 72, 252, 152, 203, 152, 223, 234, 143]),
                    "1": new Uint8Array([109, 46, 203, 187, 251, 46, 109, 205, 112, 86, 250, 249, 175, 106, 160, 110, 174, 89, 67, 145, 219, 152, 50, 121, 166, 191, 39, 224, 235, 34, 134, 20]),
                    "100000": new Uint8Array([137, 225, 98, 84, 235, 173, 92, 186, 114, 224, 174, 190, 22, 20, 199, 249, 183, 149, 167, 80, 95, 38, 55, 32, 108, 225, 10, 52, 73, 162, 184, 187])
                },
                "SHA-1": {
                    "1000": new Uint8Array([110, 64, 145, 10, 192, 46, 200, 156, 235, 185, 216, 152, 177, 58, 9, 209, 205, 122, 223, 111, 140, 192, 140, 196, 115, 48, 44, 137, 115, 170, 46, 25]),
                    "1": new Uint8Array([30, 67, 122, 28, 121, 215, 91, 230, 30, 145, 20, 29, 174, 32, 175, 252, 72, 146, 204, 153, 171, 204, 63, 231, 83, 136, 123, 204, 200, 146, 1, 118]),
                    "100000": new Uint8Array([169, 225, 190, 187, 54, 188, 38, 215, 201, 151, 213, 72, 60, 188, 141, 228, 164, 25, 209, 231, 6, 87, 19, 66, 99, 37, 134, 236, 51, 10, 114, 144])
                },
                "SHA-256": {
                    "1000": new Uint8Array([79, 197, 138, 33, 193, 0, 206, 24, 53, 184, 249, 153, 29, 115, 139, 86, 150, 93, 20, 178, 78, 23, 97, 251, 223, 252, 105, 172, 94, 11, 102, 122]),
                    "1": new Uint8Array([247, 206, 11, 101, 61, 45, 114, 164, 16, 140, 245, 171, 233, 18, 255, 221, 119, 118, 22, 219, 187, 39, 167, 14, 130, 4, 243, 174, 45, 15, 111, 173]),
                    "100000": new Uint8Array([100, 168, 104, 212, 178, 58, 246, 150, 211, 115, 77, 11, 129, 77, 4, 205, 209, 172, 40, 1, 40, 233, 118, 83, 160, 95, 50, 180, 156, 19, 162, 154])
                }
            }
        }
    };

    return {passwords: passwords, salts: salts, derivations: derivations, derivedKeyTypes: derivedKeyTypes};
}
