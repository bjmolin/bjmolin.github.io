<?php
function isArmstrong($num) {
    $numStr = (string)$num;
    $length = strlen($numStr);
    $sum = 0;

    for ($i = 0; $i < $length; $i++) {
        $sum += pow((int)$numStr[$i], $length);
    }

    return $sum == $num;
}

function isPrime($num) {
    if ($num < 2) return false;
    for ($i = 2; $i <= sqrt($num); $i++) {
        if ($num % $i == 0) {
            return false;
        }
    }
    return true;
}

function isFibonacci($num) {
    if ($num < 0) return false;
    $a = 0;
    $b = 1;
    if ($num == $a || $num == $b) return true;
    $c = $a + $b;
    while ($c <= $num) {
        if ($c == $num) return true;
        $a = $b;
        $b = $c;
        $c = $a + $b;
    }
    return false;
}

function initializeFiles() {
    $files = ['prime.txt', 'armstrong.txt', 'fibonacci.txt', 'none.txt'];
    foreach ($files as $file) {
        file_put_contents($file, '');
    }
}

function resetFiles() {
    $files = ['prime.txt', 'armstrong.txt', 'fibonacci.txt', 'none.txt'];
    foreach ($files as $file) {
        if (file_exists($file)) {
            unlink($file);
        }
    }
    setcookie('first_visit', '', time() - 3600);
}

if (!isset($_COOKIE['first_visit'])) {
    setcookie('first_visit', '1', time() + (86400 * 30)); // Cookie lasts for 30 days
    initializeFiles();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];
    if ($action == "RESET") {
        resetFiles();
        header("Location: index.html");
        exit();
    }

    if ($action == "CHECK THESE NUMBERS" && isset($_POST['numbers'])) {
        $numbers = explode(',', $_POST['numbers']);
        $numbers = array_slice($numbers, 0, 100); // Limit to 100 numbers
        $armstrongFile = fopen('armstrong.txt', 'a');
        $primeFile = fopen('prime.txt', 'a');
        $fibonacciFile = fopen('fibonacci.txt', 'a');
        $noneFile = fopen('none.txt', 'a');

        foreach ($numbers as $number) {
            $number = trim($number);
            if (is_numeric($number)) {
                $number = (int)$number;
                $isArmstrong = isArmstrong($number);
                $isPrime = isPrime($number);
                $isFibonacci = isFibonacci($number);
                
                if ($isArmstrong) {
                    fwrite($armstrongFile, $number . PHP_EOL);
                }
                if ($isPrime) {
                    fwrite($primeFile, $number . PHP_EOL);
                }
                if ($isFibonacci) {
                    fwrite($fibonacciFile, $number . PHP_EOL);
                }
                if (!$isArmstrong && !$isPrime && !$isFibonacci) {
                    fwrite($noneFile, $number . PHP_EOL);
                }
            }
        }
        fclose($armstrongFile);
        fclose($primeFile);
        fclose($fibonacciFile);
        fclose($noneFile);
        echo "Numbers have been processed!";
    } else {
        $fileToDisplay = strtolower($action) . '.txt';
        if (file_exists($fileToDisplay)) {
            $content = file_get_contents($fileToDisplay);
            echo '<h2>Results for ' . ucfirst($action) . '</h2>';
            echo '<p>' . nl2br($content) . '</p>';
        } else {
            echo "No data available for $action.";
        }
    }
}
?>
