export default {

    // 节流函数
    thorttle: (fn, interval = 500) => {
        let timer = null;
        return function (...args) {
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(this, args);
                    clearTimeout(timer);
                    timer = null
                }, interval);
            }
        }
    },

    // 
    serialize: (form) => {
        var parts = [],
            field = null,
            i,
            len,
            j,
            optLen,
            option,
            optValue;
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];
            switch (field.type) {
                case "select-one":
                case "select-multiple":
                    if (field.name.length) {
                        for (j = 0, optLen = field.options.length; j < optLen; j++) {
                            option = field.options[j];
                            if (option.selected) {
                                optValue = "";
                                if (option.hasAttribute) {
                                    optValue = (option.hasAttribute("value") ? option.value : option.text);
                                } else {
                                    optValue = (option.attributes["value"].specified ? option.value : option.text);
                                }
                                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                            }
                        }
                    }
                    break;
                case undefined:   //fieldset
                case "file":    //file input
                case "submit":   //submit button
                case "reset":    //reset button
                case "button":   //custom button
                    break;
                case "radio":    //radio button
                case "checkbox":  //checkbox
                    if (!field.checked) {
                        break;
                    }
                /* falls through */
                default:
                    //don't include form fields without names
                    if (field.name.length) {
                        parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                    }
            }
        }
        console.log(parts);
        return parts.join("&");
    },

    // 获取cookies
    getCookie: (cookieName) => {
        var cookieValue = "";
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var arr = cookie.split('=');
                if (arr[0] == cookieName) {
                    cookieValue = arr[1];
                    break;
                }
            }
        }
        return cookieValue;
    },

    // 日期格式化
    dateFormat: (fmt, date) => {
        let ret;
        const opt = {
            "y+": date.getFullYear().toString(),        // 年
            "M+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "h+": date.getHours().toString(),           // 时
            "m+": date.getMinutes().toString(),         // 分
            "s+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    }

}
