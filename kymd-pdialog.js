//author: CKylin
//创建一个容器，方便存放dialog
dialogdiv = document.createElement('div');
dialogdiv.id = 'dialogs';
document.body.appendChild(dialogdiv);
//创建dialod模版
var templete = document.createElement('script');
templete.type = 'text/templete';
templete.id = 'dialogtemplete';
var templetecontent = '';
templetecontent += "    <dialog id=\'dialog\'>";
templetecontent += "        <div id=\'dialog-card\' class=\'card dialog\'>";
templetecontent += "        <div class=\'card-header\' id=\'dialog-header\'></div>";
templetecontent += "        <div class=\'card-body\' id=\'dialog-contents\'></div>";
templetecontent += "        <div class=\'card-footer card-footer-right\'>";
templetecontent += "            <button class=\'primary\' id=\'dialog-ok\' onclick=\'pdialog.runOkCallback();pdialog.closeModal()\' style=\'display:none\'>Ok</button>";
templetecontent += "            <button id=\'dialog-close\' onclick=\'pdialog.runCloseCallback();pdialog.closeModal()\' style=\'display:inline-block\'>Close</button>";
templetecontent += "        </div>";
templetecontent += "        <div class=\'clear\'></div>";
templetecontent += "    </div>";
templetecontent += "    </dialog>";
templete.innerHTML = templetecontent;
document.body.appendChild(templete);

//辅助函数：元素样式类修改(已包含于kymd.js)
// function addClass(obj, cls) {
//     var obj_class = obj.className;
//     var blank = (obj_class != '') ? ' ' : '';
//     var added = obj_class + blank + cls;
//     obj.className = added;
// }

// function removeClass(obj, cls) {
//     var obj_class = ' ' + obj.className + ' ';
//     obj_class = obj_class.replace(/(\s+)/gi, ' ');
//     var removed = obj_class.replace(' ' + cls + ' ', ' ');
//     removed = removed.replace(/(^\s+)|(\s+$)/g, '');
//     obj.className = removed;
// }

// function hasClass(obj, cls) {
//     var obj_class = obj.className;
//     var obj_class_lst = obj_class.split(/\s+/);
//     var x = 0;
//     for (x in obj_class_lst) {
//         if (obj_class_lst[x] == cls) {
//             return true;
//         }
//     }
//     return false;
// }
/* 
 * 使用：
 * var dialog = new pdialog();
 * dialog.setTitle('Title')
 *       .setContent('Contents')
 *       .setCloseButton('Close this!')
 *       .show();
 * dialog.updateTitle('Hey! here is a dialog!');
 * dialog.updateContent('This is a dialog powered by polyfill-dialog.js');
 * dialog.closeModal();
 */
class pdialog {
    constructor() {
        this.title = '';
        this.content = '';
        this.closeButton = '关闭';
        this.okButton;
        this.closeCallback = function() { console.log('close!') };
        this.okCallback = function() { console.log('ok!') };
        this.showing = false;
        this.dialogElement = null;
    }

    getTitle() {
        return this.title;
    }
    getContent() {
        return this.content
    }
    getCloseButton() {
        return this.closeButton;
    }
    getOkButton() {
        return this.okButton;
    }
    getCloseCallback() {
        return this.closeCallback;
    }
    getOkCallback() {
        return this.okCallback;
    }
    getElement() {
        return this.dialogElement;
    }
    isShowing() {
        return this.showing;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }
    updateTitle(title) {
        if (title) this.title = title;
        if (this.showing) document.getElementById("dialog-header").innerHTML = this.title;
    }
    setContent(content) {
        this.content = content;
        return this;
    }
    updateContent(content) {
        if (content) this.content = content;
        if (this.showing) document.getElementById("dialog-contents").innerHTML = this.content;
    }
    setCloseButton(closeButton) {
        this.closeButton = closeButton;
        return this;
    }
    updateCloseButton(text) {
        if (text) this.closeButton = text;
        if (this.showing) document.getElementById("dialog-close").innerHTML = this.closeButton;
    }
    updateCloseCallback(callback) {
        if (callback) this.closeCallback = callback;
        pdialog.closeCallback = this.closeCallback;
    }
    setOkButton(okButton) {
        this.okButton = okButton;
        return this;
    }
    updateOkButton(text) {
        if (text) this.okButton = text;
        if (this.showing) document.getElementById("dialog-ok").innerHTML = this.okButton;
    }
    updateOkCallback(callback) {
        if (callback) this.okCallback = callback;
        pdialog.okCallback = this.okCallback;
    }
    setCloseCallback(callback) {
        this.closeCallback = callback;
        return this;
    }
    setOkCallback(callback) {
        this.okCallback = callback;
        return this;
    }
    showOkButton(bool = true) {
        if (!this.showing) return;
        if (bool) {
            document.getElementById("dialog-ok").style.display = "inline-block";
        } else {
            document.getElementById("dialog-ok").style.display = "none";
        }
        return this;
    }
    showCloseButton(bool = true) {
        if (!this.showing) return;
        if (bool) {
            document.getElementById("dialog-close").style.display = "inline-block";
        } else {
            document.getElementById("dialog-close").style.display = "none";
        }
        return this;
    }
    doInsertDom() {
        var dialogs = document.getElementById('dialogs');
        dialogs.innerHTML = document.getElementById('dialogtemplete').innerHTML;
        return this;
    }
    doClearDom() {
        if (!this.showing) return;
        var dialogs = document.getElementById('dialogs');
        dialogs.innerHTML = '';
    }

    static runOkCallback(e) {
        if (!pdialog.showing) return;
        eval(pdialog.okCallback);
    }

    static runCloseCallback(e) {
        if (!pdialog.showing) return;
        eval(pdialog.closeCallback);
    }

    static closeModal() {
        pdialog.showing = false;
        pdialog.showing = false;
        addClass(document.getElementById('dialog-card'), 'off');
        addClass(document.getElementById('dialog'), 'hide')
        setTimeout((function() { document.getElementById('dialog').close() }), 300);
        return false;
    }
    closeModals() {
        pdialog.closeModal();
        return this;
    }

    show() {
        this.showing = true;
        pdialog.showing = true;
        this.doInsertDom();
        this.updateTitle();
        this.updateContent();
        this.updateCloseButton();
        this.showCloseButton();
        this.updateCloseCallback();
        this.showOkButton(false);
        if (this.okButton) {
            this.updateOkButton();
            this.showOkButton();
            this.updateOkCallback();
        }
        this.dialogElement = document.querySelector('dialog');
        dialogPolyfill.registerDialog(this.dialogElement);
        this.dialogElement.showModal();
        addClass(document.getElementById('dialog-card'), 'on');
        addClass(document.getElementById('dialog'), 'show');
        return this;
    }
}