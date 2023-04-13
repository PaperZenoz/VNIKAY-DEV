$(document).ready(function () {


    function progressLine() {
        var
            $progressLine = $('.progress-line')


        $progressLine.each(function () {
            var
                $progressLine = $(this),
                $doneLine = $progressLine.find('.progress-line__done'),
                $generalValue = $progressLine.data('general'),
                $doneValue = $progressLine.data('done'),
                $doneWidth = $doneValue / $generalValue * 100


            $doneLine.css({'width': $doneWidth + '%'})

        })


    }


    function lessonList() {
        var $list = $('.lesson__list'),
            $navigation = $('.lesson__navigation'),
            $button = $navigation.find('.lesson__arrow'),
            $listButton = $('.lesson__list-button')


        $listButton.on('click', function (e) {
            e.preventDefault()
            $list = $('.lesson__list').slideToggle()
            $(this).toggleClass('open')
        })


    }


    progressLine()
    lessonList()

})
