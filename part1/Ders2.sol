//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Public Internal External View Pure  
contract Ders2 { 

    // Public: Bu terim diğer kontratlar veya dış dünyadan erişilebilir ve çağrılabilir.
    uint256 public sayi1 = 25;
    uint256  sayi2 = 35;


    // Internal: Bu terim yalnızca iç kontratlar içerisinden, yani aynı kontrat içerisinden veya miras alan kontratlardan çağrılabilir olduğunu ifade eder.
    string internal kullanici = "Lestonz";

    function pureInternal() internal pure returns (string memory) {
        return "Merhaba Internal Function";
    }


    // External: Bu terim sadece dışarıdan, başka bir kontrattan çağrılabilir olduğunu ifade eder.

    function extenalSayi (uint256 _sayi) external {
        sayi2 = _sayi;
    }
    


    // View: Bu terim kontrat durumunu değiştirmemesi ve hiçbir veri yazmaması gerektiğini ifade eder.
    function externalSayiOkuma( ) external view returns (uint256) {
        return sayi2;
    }

    function kullaniciOkuma() public view returns (string memory) {
        return kullanici;
    } 

    // Pure: Bu terimun dış durumu veya herhangi bir kontrat durumunu değiştirmemesi gerektiğini ifade eder.

    function internalToPublic() public pure returns (string memory) {
        return pureInternal(); 
    } 

}