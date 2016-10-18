gymManagementApp.factory('clinicalDocsService', function () {
    var clinicalDocsService = {};

    clinicalDocsService.VisitingDetails = "";

    clinicalDocsService.ChangeData = function (value) {

        clinicalDocsService.VisitingDetails = value;
    };

    return clinicalDocsService;
});

gymManagementApp.directive('draw', function () {
    return {
        restrict: 'AEC',
        link: function postLink(scope, element, attrs) {
            var canvas = element[0];//  document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            var lastX;
            var lastY;
            var rectX;
            var rectY;
            var circleX;
            var circleY;
            var canvasOffset = $(element[0]).offset();
            var offsetX = canvasOffset.left;
            var offsetY = canvasOffset.top;
            var isMouseDown = false;
            var strokeColor = "black";
            var strokeWidth = 5;
            var mode = "pen";
            var height;
            var width;
            var circleWidth;
            var circleHeight;
            var circleAsignedWidth;

            scope.internalControl = scope.CanvasControl || {};
            scope.internalControl.resetCanvas = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            };

            scope.internalControl.activatePen = function () {
                scope.CanvasControl.isEraserSelected = false;
                $(canvas).removeClass("eraserCursor");
                $(canvas).addClass("pencilCursor");
                $("#btnPencil").addClass("selectedBackgroundColor");
                $("#btnEraser").removeClass("selectedBackgroundColor");
                $("#btnCircle").removeClass("selectedBackgroundColor");
                $("#btnRectangle").removeClass("selectedBackgroundColor");
                mode = "pen";
            };
            scope.internalControl.activateRectangle = function () {
                scope.CanvasControl.isEraserSelected = false;
                $(canvas).removeClass("eraserCursor");
                $(canvas).addClass("pencilCursor");
                $("#btnRectangle").addClass("selectedBackgroundColor");
                //$("#btnRectangle").addClass("black-color");
                $("#btnEraser").removeClass("selectedBackgroundColor");
                $("#btnPencil").removeClass("selectedBackgroundColor");
                $("#btnCircle").removeClass("selectedBackgroundColor");
                mode = "Rectangle";
            };

            scope.internalControl.activateCircle = function () {
                scope.CanvasControl.isEraserSelected = false;
                $(canvas).removeClass("eraserCursor");
                $(canvas).addClass("pencilCursor");
                $("#btnCircle").addClass("selectedBackgroundColor");
                $("#btnEraser").removeClass("selectedBackgroundColor");
                $("#btnPencil").removeClass("selectedBackgroundColor");
                $("#btnRectangle").removeClass("selectedBackgroundColor");
                mode = "Circle";
            };

            scope.internalControl.activateEraser = function () {
                scope.CanvasControl.isEraserSelected = true;
                $(canvas).removeClass("pencilCursor");
                $(canvas).addClass("eraserCursor");
                $("#btnPencil").removeClass("selectedBackgroundColor");
                $("#btnEraser").addClass("selectedBackgroundColor");
                $("#btnCircle").removeClass("selectedBackgroundColor");
                $("#btnRectangle").removeClass("selectedBackgroundColor");
                mode = "eraser";
            };

            scope.internalControl.UpdateStrokeColor = function (color) {
                scope.CanvasControl.strokeColor = color;
                strokeColor = color;
            };

            function handleMouseDown(e) {
                mouseX = parseInt(e.offsetX);
                mouseY = parseInt(e.offsetY);

                // Put your mousedown stuff here
                lastX = mouseX;
                lastY = mouseY;
                isMouseDown = true;
                

                if (mode == "Rectangle") {
                    rectX = mouseX;
                    rectY = mouseY;
                }
                if (mode == "Circle") {
                    circleX = mouseX;
                    circleY = mouseY;
                }

            }

            function handleMouseUp(e) {
                mouseX = parseInt(e.offsetX);
                mouseY = parseInt(e.offsetY);
                height = mouseX - rectX;
                width = mouseY - rectY;
                circleWidth = mouseY - circleY;
                circleHeight = mouseX - circleX;
               
                if (circleWidth < 0)
                {
                    circleWidth = (-circleWidth);
                }
                if (circleHeight < 0) {
                    circleHeight = (-circleHeight);
                }
                if (circleHeight < circleWidth)
                {
                    circleAsignedWidth = circleWidth
                }
                else {
                    circleAsignedWidth = circleHeight
                }


                // Put your mouseup stuff here
                isMouseDown = false;
                if (mode == "Rectangle") {
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.globalCompositeOperation = "source-over";
                    ctx.rect(rectX, rectY, height, width);
                    ctx.strokeStyle = strokeColor;
                    ctx.stroke();
                    mode == "pen";
                }
                if (mode == "Circle") {
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.globalCompositeOperation = "source-over";
                    ctx.arc(mouseX, mouseY, circleWidth, 0, Math.PI * 2);
                    ctx.strokeStyle = strokeColor;
                    ctx.stroke();
                    mode == "pen";
                }
            }

            function handleMouseMove(e) {
                if (mode != "Rectangle") {
                mouseX = parseInt(e.offsetX);
                mouseY = parseInt(e.offsetY);
               
                // Put your mousemove stuff here
                if (isMouseDown) {
                    ctx.beginPath();
                    if (mode == "pen") {
                        ctx.globalCompositeOperation = "source-over";
                        ctx.moveTo(lastX, lastY);
                        ctx.lineTo(mouseX, mouseY);
                            ctx.lineWidth = 3;
                        ctx.strokeStyle = strokeColor;
                        ctx.stroke();
                        } else if (mode == "eraser") {
                        ctx.globalCompositeOperation = "destination-out";
                        ctx.arc(lastX, lastY, scope.CanvasControl.strokeWidth, 0, Math.PI * 2, false);
                        ctx.fill();
                        scope.internalControl.DrawBackgroundImage(ctx);
                    }
                    lastX = mouseX;
                    lastY = mouseY;
                }
            }
            }

            $("#patientClinicalImage").on('load', function () {
                element[0].height = this.height;
                element[0].width = this.width;

                scope.internalControl.DrawBackgroundImage(ctx);
            });

            element.on('mousedown', handleMouseDown).on('mouseup', handleMouseUp).on('mousemove', handleMouseMove);

            scope.internalControl.activatePen();
        }
    };
});

gymManagementApp.factory('patientClinicalImagesService', function () {
    var patientClinicalImagesService = {};

    patientClinicalImagesService.PatientClinicalImages = "";
    patientClinicalImagesService.DeletedPatientclinicalImages = "";

    patientClinicalImagesService.UpdatePatientClinicalImages = function (data) {
        patientClinicalImagesService.PatientClinicalImages = data;
    };

    patientClinicalImagesService.UpdateDeletedPatientclinicalImages = function (data) {
        patientClinicalImagesService.DeletedPatientclinicalImages = data;
    };

    return patientClinicalImagesService;
});