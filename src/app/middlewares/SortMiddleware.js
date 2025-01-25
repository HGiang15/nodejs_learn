module.exports = function SortMiddleware (req, res, next) {

    res.locals._sort = {
        enabled: false,
        type: 'default'
    }

    // if co chuc nang sort bat sort len
    if (req.query.hasOwnProperty('_sort')) {
        res.locals._sort.enabled = true
        res.locals._sort.type = req.query.type // gan lai bang type truyen tren url
        res.locals._sort.column = req.query.column 

        // C2: Hop nhat object: obj sau hop vao obj 1 trung key thi ghi de
        // Object.assign(res.locals._sort, {
        //     enabled: true,
        //     type: req.query.type,
        //     column: req.query.column
        // })
    }

    next()
}