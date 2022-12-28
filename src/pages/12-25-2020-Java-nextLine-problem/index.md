---
path: '/java-nextLine-problem'
date: '25 December 2020'
sortDate: 2020/12/25
title: 'The Solution to the Scanner.nextLine Problem'
author: 'Anwar Haredy'
description: 'Prevent Scanner.nextLine from being consumed with this one simple trick!'
---
<h2>The problem</h2>


After you use a `Scanner.next()` in a Java console program, the next `Scanner.nextLine()` method appears to be skipped entirely when running the program.


<h2>The cause</h2>

When pressing "Enter" to feed your program an input via `Scanner.next()` or any of its sister methods, you create a newline ("\n") character that is not consumed by your Scanner.
Now, the next time `Scanner.nextLine()` is called, it consumes the "\n" character instead and appears to be entirely skipped.

<h2>The solution</h2>

One way to solve this problem is to simply use an additional `Scanner.nextLine()` after every `Scanner.next()` call.

```java
Scanner input = new Scanner(System.in);

String phoneNumber = input.next();

input.nextLine() //Consumes the newline character
String fullName = input.nextLine()
```

This will force the first instance of nextLine to consume the additional
"\n" character and free the other one to do its job. However, there are two problems with this solution.

* It does not look pleasant or elegant.
* It may create problems if you are using loops in your program.

The best solution in my opinion is to use `Scanner.nextLine()` to read every single input in your program. And then just parse as required.

```java{numberLines: true}
int numberOfDays = Integer.parseInt(input.nextLine()) //For integers.
double cost = Double.parseDouble(input.nextLine()) //For doubles.
String fullName = input.nextLine() //For Strings

//...and so on
```

This neatly solves the problem!
