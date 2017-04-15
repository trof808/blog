const mongoose = require('mongoose');

const PostScheme = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    description: {type: String},
    date: { type: String },
    image: {type: String},
    tags: { type: Array, required: [true, 'field password is required'] },
    likes: { type: Number },
    watches: {type: String},
    comments: { type: Number },
    translation: { type: Boolean, default: false },
    tutorial: {type: Boolean, default: false}
});

PostScheme.methods.getDecription = (content) => {
    return content.split(' ').splice(0, 40).join(' ') + '...';
};

PostScheme.methods.getCorrectDate = (date) => {
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    monthIndex = monthIndex.toString();
    if (monthIndex.length < 2) {
        monthIndex = '0' + monthIndex;
    }

    let nowDate = day + '.' + monthIndex + '-' + year;

    return nowDate;
};

Post = mongoose.model('Post', PostScheme);

// let post = new Post;
// post.title = 'Моделирование данных в MongoDB';
// post.content = "Наверное, многим интересно, как же команде Telegram удалось сделать популярную для мессенджеров функцию голосовых звонков уже сразу после запуска разительно отличающейся по качеству в лучшую сторону перед многими другими VoIP — сервисами. Во время изучения работы Telegram Calls я обратил внимание на интересную техническую деталь, которая используется на сетевом уровне и помогает уменьшить задержки при прохождении пакетов, когда при соединении используются релейные сервера. Если взглянуть на дамп трафика, который проходит при звонке, в котором использовался релейный сервер, можно заметить, что трафик определяется протоколом RIP. IP на 91. — это сервер Telegram. Я снимал дамп трафика на своём VPN — сервере, поэтому адрес клиента из локальной подсети.";
// post.date = new Date('DD.MM.YYYY');
// post.image = 'post1.jpg';
// post.tags = ['Javascript, Python, NodeJS'];
// post.likes = 12;
// post.watches = 35;
// post.comments = 3;
// post.translation = true;
//
// post.save();

module.exports = Post;
