//  默认的参数
//  模板的样式
//  盒子的样
$.make2048=function(id,c_option){
  // d_option = default OPtion
  // 默认配置
  var d_option={
    width: 4,
    height: 4,
    box_size: 100,
    bg_style: {
      padding:18,
      bg_color: 'rgb( 184, 175, 158)',
      bg_border_color: 'rgb(204, 192, 178 )',
    },
    blocks: [
      { level: 0, value: 2, style: { 'background-color': 'rgb(238,228,218)', 'color': 'rgb(124,115,106)', 'font-size': 58 } },
      { level: 1, value: 4, style: { 'background-color': 'rgb(236,224,200)', 'color': 'rgb(124,115,106)', 'font-size': 58 } },
      { level: 2, value: 8, style: { 'background-color': 'rgb(242,177,121)', 'color': 'rgb(255,247,235)', 'font-size': 58 } },
      { level: 3, value: 16, style: { 'background-color':'rgb(245,149,99)', 'color': 'rgb(255,250,235)', 'font-size': 50 } },
      { level: 4, value: 32, style: { 'background-color': 'rgb(244,123,94)', 'color': 'rgb(255,247,235)', 'font-size': 50 } },
      { level: 5, value: 64, style: { 'background-color': 'rgb(247,93,59)', 'color': 'rgb(255,247,235)', 'font-size': 50 } },
      { level: 6, value: 128, style: { 'background-color': 'rgb(236,205,112)', 'olor': 'rgb(255,247,235)', 'font-size': 42 } },
      { level: 7, value: 256, style: { 'background-color': 'rgb(237,204,97)', 'olor': 'rgb(255,247,235)', 'font-size': 42 } },
      { level: 8, value: 512, style: { 'background-color': 'rgb(236,200,80)', 'olor': 'gb(255,247,235)', 'font-size': 42 } },
      { level: 9, value: 1024, style: { 'background-color': 'rgb(237,197,63)', 'olor': 'rgb(255,247,235)', 'font-size': 34 } },
      { level: 10, value: 2048, style: { 'background-color': 'rgb(238,194,46)', 'olor': 'rgb(255,247,235)', 'font-size': 34 } },
      { level: 11, value: 4096, style: { 'background-color': 'rgb(61,58,51)', 'color': 'rgb(255,247,235)', 'font-size': 34 } }
    ],
    box_style: {
      'font-family': '微软雅黑',
      'font-weight': 'bold',
      'text-align': 'center'
    },
    animate:100
  };
  // 最终配置
  var option = $.extend( {}, d_option, c_option )
  // block 数据
  var box_data = [];
  // 初始化block
  ( function () {
    for (var i = 0; i < option.width * option.height; i++){
      box_data.push(null);
    }
  }
  )();
  // 获得x,y
  function get_coordinate( index ){
    var x = index % option.height;
    var y = Math.floor(index / option.height);
    return {x : x, y : y};
  }
  // 获得坐标
  function get_pos(x, y){
    var top = y * option.box_size + (y + 1) * option.bg_style.padding;
    var left = x * option.box_size  +(x + 1) * option.bg_style.padding;
    return {top : top,left : left};
  }
  // 根据x,y 转换index;
  function getIndex(x, y){
    return x + y * option.width;
  }
  //生成背景容器
  function create_bg(){
    // 背景样式
    $(id).css({  
      'background-color': option.bg_style.bg_color,
      'width': option.width * option.box_size + (option.width - 1) * option.bg_style.padding,
      'height': option.height * option.box_size + (option.height - 1) * option.bg_style.padding,
      'padding': option.bg_style.padding,
      'position': 'relative'
    });
    var all_bg_box=[];
    for(var i = 0; i < option.width * option.height;i++){
      var coordinate =get_coordinate(i);
      var pos = get_pos(coordinate.x,coordinate.y);
      var bg_box =$('<div></div>');
      bg_box.css({
        'width': option.box_size,
        'height': option.box_size,
        'background-color': option.bg_style.bg_border_color,
        'position': 'absolute',
        'top': pos.top,
        'left': pos.left
      });
      all_bg_box.push(bg_box);
    }
    $(id).append(all_bg_box);
  }
  // 判断是否失败
  function lost(){
    // console.log("正在判断");
    var has_null_arr =[];   
    for(var i=0;i<box_data.length;i++){ 
      if(box_data[i] == null){
        has_null_arr.push(i);
      }
    }
    if(has_null_arr.length == 0){
      // console.log('已经满了');
      for(var y =0;y <option.height;y++){ //改
        for(var x =0; x<option.width ;x++){
          var this_box =getIndex(x,y);
          if(y-1>0){
            var top_box =getIndex(x,y-1);
          }else{
            var top_box = null  ;
          }
          if(y < option.height-1){
            var bottom_box=getIndex(x,y+1);
          }else{
            var bottom_box =null;
          }
          if(x-1 > 0){
            var left_box=getIndex(x-1,y);
          }else{
            var left_box = null ; 
          }
          if(x < option.width-1){
            var right_box=getIndex(x+1,y);
          }else{
            right_box =null;
          }
          if(top_box){
            if(box_data[this_box].value ==  box_data[top_box].value){
              return;
            } 
          }
          if(bottom_box){
            if(box_data[this_box].value == box_data[bottom_box].value){
              return;     
            }   
          }
          if(left_box){
            if(box_data[this_box].value == box_data[left_box].value){
              return;                      
            }
          }
          if(right_box){
            if(box_data[this_box].value == box_data[right_box].value){
              return;                      
            } 
          }    
        }                                
      }
      end_game();
      return;
    }
  }
  // 随机生成box;
  function create_box(num,level){
    var random,block,coordinate,pos,box_index;
    var has_null_arr =[];
    for(var i=0;i<box_data.length;i++){ 
      if(box_data[i] == null){
        has_null_arr.push(i);
      }
    }  
    if(has_null_arr.length ==0){
      // console.log('已经满了');
      end_game();
      return;
    }
    if(num ==undefined){
      random =Math.floor(Math.random()*has_null_arr.length);
      coordinate = get_coordinate(has_null_arr[random]);
      pos = get_pos(coordinate.x,coordinate.y);
      box_index =has_null_arr[random];      
    }else{
      if(box_data[num] == null){
        random = num;  
        coordinate = get_coordinate(has_null_arr[random]);
        pos = get_pos(coordinate.x,coordinate.y);
        box_index =has_null_arr[random];
      }else{
        alert('已经有元素');
        return;
      }
    }
    if(level == undefined){
      var lv = 0;
      var block_lv = Math.round(Math.random()*100);
      block_lv < 50? lv = 0:lv =1;
      box_data[has_null_arr[random]] =option.blocks[lv];
      block = option.blocks[lv];
    }else{
      box_data[has_null_arr[random]] =option.blocks[level];
      block = option.blocks[level];
    }
    var class_num =num ? num : has_null_arr[random];   
    var c_box =$('<div>'+block.value+'</div>');
    c_box.css({
      'line-height':option.box_size+'px',
      'width':option.box_size,
      'height':option.box_size,
      'position':'absolute',
      'top':pos.top+option.box_size/2,
      'left':pos.left+option.box_size/2,
      'opacity': 0.5,
    });
    c_box.css(option.box_style).css(block.style);      
    c_box.animate({'top':pos.top,'left':pos.left,'opacity':1},option.animate,function(){
    });
    c_box.addClass(' move_box'+class_num);
    $(id).append(c_box);  
    // 判断会不会失败
  }
  // x,y 转position
  function move(block,x,y){
    var pos = get_pos(x,y);
    block.animate({
      'top':pos.top,
      'left':pos.left
    },option.animate);
  }
  // 1次事件需要做的事1次移动 需要做的事
  function move_evt(key){
    switch (key){
    // 上***************************************    
    case 'ArrowUp':
      $('body').off('keydown');
      setTimeout(function(){
        $('body').on('keydown',function(e){
          move_evt(e.key);
        });
      },option.animate+70);
      var can_create_box =0;
      for(var y =1; y < option.height ; y++){
        for(var x =0;x<option.width;x++){  
          can_create_box += do_move(x,y,1,y+1);
        }
      }
      if(can_create_box){
        setTimeout(function(){
          create_box();
          lost();
        },option.animate+50    
        );
      }else{
        lost();
        // console.log("不能移动")
      }
      for(var x = 0; x<option.width; x++){
        for(var y = 0; y<option.height; y++){
          var block = box_data[getIndex(x, y)];
          if(block == null) continue;
          delete block.justModified;
        }
      }
      break;
      // 下*********************************              
    case 'ArrowDown':
      $('body').off('keydown');
      setTimeout(function(){
        $('body').on('keydown',function(e){
          move_evt(e.key);
        });
      },option.animate+70);
      var can_create_box =0;
      for(var y =option.height-2;y>-1;y--){ //改
        for(var x =0;x<option.width;x++){   
          can_create_box += do_move(x,y,2,option.height-y);
        }
      }
      if(can_create_box){
        setTimeout(function(){
          create_box();
          lost();
        },option.animate+50    
        );
      }else{
        lost();
        // console.log("不能移动")
      }
      for(var x=0; x<option.width; x++){
        for(var y=0; y<option.height; y++){
          var block = box_data[getIndex(x, y)];
          if(block == null) continue;
          delete block.justModified;
        }
      } 
      break;
    // 左 ------------------------------  
    case 'ArrowLeft':
      $('body').off('keydown');
      setTimeout(function(){
        $('body').on('keydown',function(e){
          move_evt(e.key);
        });
      },option.animate+70);
      var can_create_box =0;
      for(var y =0;y <option.height;y++){ //改
        for(var x = 1 ; x<option.width ;x++){   // 改   
          can_create_box += do_move(x,y,3,x+1);
        }
      }             
      if(can_create_box){
        setTimeout(function(){
          create_box();
          lost();
        },option.animate+50    
        );
      }else{
        // console.log("不能移动")
        lost();
      }; 
      for(var x=0; x<option.width; x++){
        for(var y=0; y<option.height; y++){
          var block = box_data[getIndex(x, y)];
          if(block == null) continue;
          delete block.justModified;
        }
      }
      break;
    // 右****************
    case 'ArrowRight':
      $('body').off('keydown');
      setTimeout(function(){
        $('body').on('keydown',function(e){
          move_evt(e.key);
        });
      },option.animate+70);
      var can_create_box =0;
      for(y =0; y < option.height; y++){ //改
        for(var x =option.width-2;x>-1;x--){   // 改   
          can_create_box += do_move(x,y,4,option.width-x)
        }
      }
      if(can_create_box){
        setTimeout(function(){
          create_box();
          lost();
        },option.animate+50    
        );
      }else{
        lost();
        // console.log("不能移动")
      }
      for(var x=0; x<option.width; x++){
        for(var y=0; y<option.height; y++){
          var block = box_data[getIndex(x, y)];
          if(block == null) continue;
          delete block.justModified;
        }
      }
      break;
    }
  }
  // 一次移动需要做的事
  function do_move(x,y,switch_num,change1){ 
    var can_creat_box =0;      
    if(box_data[getIndex(x,y)] !=null){
      var t_block;
      var t_block_index=0;
      var t_block_data;
      var c_block =$(".move_box"+getIndex(x,y));
      var c_blcok_index =getIndex(x,y);
      var i =1; // i =y+1 if(i<option.height-y) i++
      var switch123;
      var qufan =true;
      //当前block 执行遍历操作
      while(i<change1){         
      //当 遍历的block 为 null 时

        switch(switch_num){
        case 1:
          t_block_index = getIndex(x,y-i);
          var need_index = getIndex(x,y-i+1);
          var need_if = (y-i != y-1);
          break;
        case 2:
          t_block_index = getIndex(x,y+i);
          var need_index = getIndex(x,y+i-1);
          var need_if =(y+i != y+1);
          break;
        case 3:
          t_block_index = getIndex(x-i,y);
          var need_index = getIndex(x-i+1,y);
          var need_if =(x-i != x-1);
          break;
        case 4:
          t_block_index = getIndex(x+i,y);
          var need_index = getIndex(x+i-1,y);
          var need_if =(x-i != x-1);
          break;
        }                   
        if(box_data[t_block_index] == null){
          t_block = $('.move_box'+box_data[t_block_index]);
          t_block_data = box_data[box_data[t_block_index]];
          switch123 =1;
        }
        // 当 遍历的数为数据为objict 时
        else{    
          if((box_data[t_block_index].level == box_data[c_blcok_index].level)){                        
            if(!(box_data[t_block_index].justModified && i==2)){
              t_block = $('.move_box'+t_block_index);
              t_block_data = box_data[t_block_index];        
              switch123 = 2;
              break;   
            }else{
              if(need_if){ // 改
                t_block = $('.move_box'+need_index);
                t_block_index = need_index; // 改
                t_block_data = box_data[need_index];
                switch123 = 3;
              }else{
                switch123 =0;
              }        
              break;
            }                                                              
          }
          // 但是不相当
          else{   
            if(need_if){
              t_block = $('.move_box'+need_index);
              t_block_index = need_index;
              t_block_data = box_data[need_index];
              switch123 = 3;
            }else{
              switch123 =0;
            }
            break;
          }
        }
        i++;
      }
      // 
      var getxy=get_coordinate(t_block_index);
      switch(switch123){
      // 都为null
      case 1:                       
        c_block.removeClass();
        c_block.addClass('move_box'+t_block_index);
        // 更换数据
        box_data[t_block_index] =box_data[c_blcok_index];
        box_data[c_blcok_index] =null;
        move(c_block,   getxy.x,getxy.y);
        can_creat_box = 1; 
        break;
      // 相等
      case 2:                       
        c_block.removeClass();
        c_block.addClass('move_box'+t_block_index);
        box_data[t_block_index] =option.blocks[box_data[c_blcok_index].level+1];
        box_data[c_blcok_index] =null;
        box_data[t_block_index].justModified = true;
        move(c_block,getxy.x,getxy.y);
        //值变更
        c_block.css(
          box_data[t_block_index].style
        )
        c_block.html(box_data[t_block_index].value);
        t_block.remove();
        can_creat_box = 1; 
        break;
        // 不想等
      case 3:     
        c_block.removeClass();
        c_block.addClass('move_box'+t_block_index);
        // 更换数据
        box_data[t_block_index] =box_data[c_blcok_index];
        box_data[c_blcok_index] =null;
        move(c_block,getxy.x,getxy.y);
        can_creat_box =1;                          
        break;
      }
    }
    return can_creat_box;
  }
  function on_evt(){
    $('body').on('keydown',function(e){
      move_evt(e.key);
    });
    $('body').on('mousedown',function(e){
      var click_x = e.clientX;
      var click_y = e.clientY;
      $(this).on('mouseup',function(e){
        var up_X = e.clientX;
        var up_Y = e.clientY;
        if(Math.abs(up_Y - click_y) > 50 || Math.abs(up_X - click_x) > 50 ){
          var move_y = Math.abs(up_Y - click_y);
          var move_x =Math.abs(up_X - click_x);
          var if_XY =move_y > move_x ? move_y : move_x;
          var move_direction;
          if(if_XY == move_y ){
            if(up_Y - click_y > 0){
              move_direction = 'ArrowDown';
            }else{
              move_direction = 'ArrowUp';  
            }
          }else{
            if(up_X - click_x > 0){
              move_direction = 'ArrowRight';  
            }else{
              move_direction = 'ArrowLeft';    
            }
          }
          move_evt(move_direction);
        }
        $(this).off('mouseup');
      });
    });
  }
  function start_game(){
    // 游戏开始
    create_bg();
    create_box();
    create_box();
    // 注册事件
    on_evt();
  }
  function end_game(){
    // 游戏结束
    setTimeout(function(){
      alert('游戏结束');
      $(id).children().remove();
      $(id).off('click');
      box_data =[];
      // 初始化block
      (function () {
        for (var i = 0; i < option.width * option.height; i++){
          box_data.push(null);
        }
      })();
      start_game();
    },option.animate+100);
  }
  start_game();
  return {
    i:create_box,
    j:move_evt,
    data:box_data
  };
};