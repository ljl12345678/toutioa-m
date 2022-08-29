module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*'],
            // 不转换的自定义文件
            exclude: 'github-markdown'
        },
    },
};