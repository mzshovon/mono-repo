FROM php:8.2-fpm-bullseye

RUN apt-get update && apt-get install -y libpq-dev libldap2-dev locales libzip-dev zip cron \
    && pecl install redis && docker-php-ext-enable redis \
    && docker-php-ext-install gettext pdo pdo_mysql pdo_pgsql mysqli bcmath zip

# For Mattweb
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions gd

RUN curl -sS https://getcomposer.org/installer | \
php -- --install-dir=/usr/bin/ --filename=composer

