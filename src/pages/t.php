<?php
    function plusGrand($tab) {
        if (count($tab) == 0) {
            return null;
        } else {
            $grand = 0;
            foreach($tab as $t){
                if ($t > $grand) {
                    echo $t;
                    echo 't';
                    $grand = $t;
                    echo $grand;
                }
            }
            return $grand;
        }
    }
    // echo plusGrand([1,4,3,2]);
    function verificationPassword($tab) {
        if (strlen($tab) >= 8) {
            foreach($tab as $t){
                echo 'ok';
                echo (int)$t;
                if (gettype($t) == 'int'){
                    echo 'ok';
                }
            }
            return true;
        }
    }
    // verificationPassword('rt1');
    // Créer une fonction from scratch qui s'appelle dernierElementTableau(). Elle prendra un argument de type array. Elle devra retourner le dernier élement du tableau. Si l'array est vide, il faudra retourner null;
    // Créer une fonction from scratch qui s'appelle plusGrand(). Elle prendra un argument de type array. Elle devra retourner le plus grand des élements présent dans l'array. Si l'array est vide, il faudra retourner null;
    function leet($str){
        $strm = '';
        for($i = 0; $i < strlen($str); $i++){
            switch($str[$i]){
                case 'o':
                    $strm .= '0';
                    break;
                case 'e':
                    $strm .= '3';
                    break;
                case 'i':
                    $strm .= '1';
                    break;
                default:
                    $strm .= $str[$i];
                    break;
            }
        }
        return $strm;
    }
// echo leet('teri');
    function doublon($arr){
        return array_unique($arr);
    }
    // print_r(doublon([2,2,5,7,8,8,9]));
    print_r(array_values(["id" => 1, "t" => 2]));

?>