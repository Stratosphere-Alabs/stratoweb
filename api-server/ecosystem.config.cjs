module.exports = {
    apps: [{
        name: 'sf-homepage-api',
        script: './dist/index.js',
        instances: 2,
        exec_mode: 'cluster',
        env: {
            NODE_ENV: 'production',
        },
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,
        autorestart: true,
        watch: false,
        max_memory_restart: '500M',
    }],
};
