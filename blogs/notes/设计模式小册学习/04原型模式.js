// 1.js中的原型；
  /* 
    1.编程范式；只要

  */
// 2.与java中原型的区别；

// 3.深拷贝与浅拷贝的区别，以及实现；
// 选择题选项Render
function topicOptionRender(questionBox, topicItem, containerWidth) {
    if (topicItem.topicOption && topicItem.topicOption.length > 0) {
        var optionsEmpty = topicItem.topicOption.every(function(item) {
      return item === '';
    });
    if (optionsEmpty) {
      return;
    }
    var optionWrapBox = $("<div class='option-wrap-box'></div>");
    for (var i = 0; i < topicItem.topicOption.length; i++) {
      var optionItem = base64.decode(topicItem.topicOption[i]||'');
      var optionBox = $("<div class='option-box'></div>");
      if (isHTMLTag(optionItem)) {
        optionBox.append($(optionItem));
      } else {
        optionBox.append(optionItem);
      }
      optionWrapBox.append(optionBox);
    }
    questionBox.append(optionWrapBox);
    setTopicTxtStyle(questionBox)
    // 计算宽度排版
    var maxWidth = 0;
    questionBox.find(".option-box").each(function (param) {
      maxWidth = Math.max(maxWidth, $(this).get(0).offsetWidth);
    });
    if (maxWidth < (containerWidth - 20) / 4) {
      questionBox.find(".option-box").addClass("width-25");
    } else if (maxWidth < (containerWidth - 20) / 2) {
      questionBox.find(".option-box").addClass("width-50");
    } else {
      questionBox.find(".option-box").addClass("width-100");
    }
  }
}