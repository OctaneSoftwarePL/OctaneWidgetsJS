
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--<link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico">-->

    <title>OctaneWidgetJS example form</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/checkout/">

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/select2.min.css" rel="stylesheet"/>
    <link href="css/octane.css" rel="stylesheet"/>
</head>

<body class="bg-light">

<div class="container">
    <div class="py-5 text-center">
        <h2>Example form</h2>
    </div>

    <div class="row">
        <div class="col-md-6 offset-md-3">
            <h4 class="mb-3">Address</h4>
            <form class="needs-validation" novalidate>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email <span class="text-muted">(Optional)</span></label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com">
                    <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="Some street 13B" required>
                    <div class="invalid-feedback">
                        Please enter your shipping address.
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <select class="select2 custom-select d-block w-100" id="country" name="country" required>
                            <option value="">Choose...</option>
                        </select>
                        <div class="invalid-feedback">
                            Please select a valid country.
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="state">State / Province</label>
                        <select class="select2 custom-select d-block w-100" id="state" name="state" required>
                            <option value="">Choose...</option>
                        </select>
                        <div class="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" id="zip" name="zip" placeholder="" required>
                        <div class="invalid-feedback">
                            Zip code required.
                        </div>
                    </div>
                </div>

                <h4 class="mb-3">D.O.B.</h4>
                <div class="row">
                    <div class="col-md-5 mb-3">
                        <label for="year">Year</label>
                        <select class="select2 custom-select d-block w-100" id="year" name="year" required>
                            <option value="">Choose...</option>
                            <?php for($i = date('Y'); $i>1900; $i--): ?>
                                <option value="<?= $i ?>"><?= $i ?></option>
                            <?php endfor; ?>
                        </select>
                        <div class="invalid-feedback">
                            Please select a valid year.
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="month">Month</label>
                        <select class="select2 custom-select d-block w-100" id="month" name="month" required>
                            <option value="">Choose...</option>
                            <?php for($m = 1; $m <= 12; ++$m): ?>
                                <option value="<?= $m  ?>"><?= date('F', mktime(0, 0, 0, $m, 1)) ?></option>
                            <?php endfor; ?>
                        </select>
                        <div class="invalid-feedback">
                            Please provide a valid month.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="mondayth">Day</label>
                        <select class="select2 custom-select d-block w-100" id="day" name="day" required>
                            <option value="">Choose...</option>
                            <?php for($d = 1; $d <= 31; ++$d): ?>
                                <option value="<?= $d  ?>"><?= $d ?></option>
                            <?php endfor; ?>
                        </select>
                        <div class="invalid-feedback">
                            Please provide a valid day.
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3 mb-3">
                        <label for="age">Age</label>
                        <input type="text" class="form-control" id="age" name="age" placeholder="0" disabled>
                    </div>
                </div>
                <hr class="mb-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
            </form>
        </div>
    </div>

    <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">&copy; 2020 Company Name</p>
        <ul class="list-inline">
            <li class="list-inline-item"><a href="#">Privacy</a></li>
            <li class="list-inline-item"><a href="#">Terms</a></li>
            <li class="list-inline-item"><a href="#">Support</a></li>
        </ul>
    </footer>
</div>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<!--<script src="https://code.jquery.com/jquery-3.1.1.min.js" crossorigin="anonymous"></script>-->
<script src="js/jquery-3.1.1.min.js"></script>
<script>window.jQuery || document.write('<script src="js/jquery-slim.min.js"><\/script>')</script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/holder.min.js"></script>
<script src="js/select2.min.js"></script>

<script src="js/octane/inputWidget.js"></script>
<script src="js/octane/selectWidget.js"></script>
<script src="js/octane/selectAutoCompleteWidget.js"></script>

<script src="js/core.js"></script>

<script type="text/javascript">

</script>
</body>
</html>
