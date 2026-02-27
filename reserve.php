<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Restinfo</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>

  <body>
    <div>
      <div>
        <h1>Lebistro Francais</h1>
        <p>
          <span></span>
          4.5 (120 Reviews) French СБД 15р хороо МУИС 1-р байрны баруун талд
        </p>
      </div>

      <div>
        <ul>
          <li><a title="Overview">Overview</a></li>
          <li><a title="Menu">Menu</a></li>
          <li><a title="Reserve">Захиалга</a></li>
          <li><a title="Reviews">Санал хүсэлт</a></li>
        </ul>
      </div>

      <div>
        <h2>Ширээ захиалга</h2>

        <form action="Confirm_page.php" method="post">
          <div>
            <label for="date">Хэзээ</label>
            <select id="date" name="date">
              <option value="">Өдрөө сонгоно уу</option>
              <option value="2026-02-28">Today</option>
              <option value="2026-03-01">Tomorrow</option>
              <option value="2026-03-02">Monday</option>
            </select>

            <label for="time">Цаг</label>
            <select id="time" name="цаг">
              <option value="">Цагаа сонгоно уу</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM</option>
            </select>

            <label for="size">Ширээний хэмжээ</label>
            <select id="size" name="ширээ">
              <option value="">Ширээ сонгоно уу</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
	      <option value="6">Түүнээс дээш</option>
            </select>
          </div>

          <div>
            <label for="request">Нэмэлт хүсэлт (Сонголтоор)</label>
            <textarea id="request" name="request" rows="1" cols="30"></textarea>
          </div>

          <div>
            <input type="submit" value="Баталгаажуулах" />
          </div>
        </form>
      </div>
    </div>
  </body>
</html>
