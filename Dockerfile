
FROM public.ecr.aws/amazonlinux/amazonlinux:2023

LABEL maintainer="Amazon AWS"

######################################################################
#   Environment variable to identify the image version at runtime    #
######################################################################

ENV AWS_AMPLIFY_BUILD_IMAGE_VERSION=2023-11

###########################
#   Install OS packages   #
###########################

RUN yum -y update && \
    yum -y install --allowerasing \
        alsa-lib-devel \
        autoconf \
        automake \
        bzip2 \
        bison \
        cmake \
        expect \
        fontconfig \
        gawk \
        gcc-c++ \
        git \
        gnupg2 \
        gtk3-devel \
        libnotify-devel \
        libpng \
        libpng-devel \
        libffi-devel \
        libtool \
        libX11 \
        libXext \
        libxml2 \
        libxml2-devel \
        libXScrnSaver \
        libxslt \
        libxslt-devel \
        libwebp \
        libwebp-devel \
        libyaml \
        libyaml-devel \
        make \
        nss-devel \
        openssl-devel \
        openssh-clients \
        patch \
        procps \
        readline-devel \
        sqlite-devel \
        sudo \
        tar \
        tree \
        unzip \
        vi \
        wget \
        which \
        xorg-x11-server-Xvfb \
        zip \
        zlib \
        zlib-devel \
        bzip2-devel && \
    yum clean all && \
    rm -rf /var/cache/yum

USER root
ENV HOME=/root

RUN echo '# Aliases to allow running commands without `sudo`,\n'\
'# pretending to be running as root\n'\
'alias yum="sudo yum"\n'\
'alias dfn="sudo dnf"\n'\
'alias rpm="sudo rpm"\n'\
'alias amazon-linux-extras="sudo amazon-linux-extras"\n'\
'\n'\
'# Load NVM when the shell is initialized\n'\
'export NVM_DIR="$HOME/.nvm"\n'\
'[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"\n'\
'\n'\
> $HOME/.bashrc

###########################
#   Create Amplify user   #
###########################

RUN adduser --system --uid 900 --create-home --home-dir $HOME amplify && \
    echo "amplify ALL = NOPASSWD : /usr/bin/yum, /usr/bin/dnf, /bin/rpm, /usr/bin/amazon-linux-extras" >> /etc/sudoers && \
    chown -R amplify:amplify $HOME && \
    chmod -R u+w $HOME

RUN chown root:root /usr/bin
RUN usermod -aG root amplify
RUN chmod 775 /usr/bin

USER amplify

#####################################
#   Change base working directory   #
#####################################

WORKDIR $HOME
RUN mkdir -p $HOME/bin

###############################################
#   Install NPM, Node, and default packages   #
###############################################

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
ENV NVM_DIR=$HOME/.nvm

RUN echo \
'@aws-amplify/cli\n'\
'bower\n'\
'cypress\n'\
'grunt-cli\n'\
'hugo-extended\n'\
'vuepress\n'\
'yarn'\
> $NVM_DIR/default-packages

RUN chown amplify:amplify $NVM_DIR/default-packages

RUN [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install 14 && \
    nvm install 16 && \
    nvm install 18 && \
    nvm install 20 && \
    nvm alias default 18 && \
    nvm cache clear

###################################################
#   Install Pyenv, Python, and default packages   #
###################################################
    
ENV PYENV_ROOT=$HOME/.pyenv
ENV PATH="$PYENV_ROOT/bin:$PATH"

RUN curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash && \
    git clone https://github.com/jawshooah/pyenv-default-packages.git $PYENV_ROOT/plugins/pyenv-default-packages && \
    echo 'eval "$(pyenv init -)"' >> $HOME/.bashrc

RUN echo \
'awscli >= 1\n'\
'aws-sam-cli >= 1.90.0'\
> $PYENV_ROOT/default-packages

RUN chown amplify:amplify $PYENV_ROOT/default-packages

RUN pyenv install 3.8 && \
    pyenv install 3.9 && \
    pyenv install 3.10 && \
    pyenv install 3.11 && \
    pyenv global 3.10

###################################################################
#   Create symlinks for old versions of Python,                   #
#   this keeps backwards compatibility with the previous image.   #
###################################################################

USER root
RUN ln -s $HOME/.pyenv/shims/python3.8 /usr/bin/python3.8 && \
    ln -s $HOME/.pyenv/shims/pip3.8 /usr/bin/pip3.8
USER amplify

###############################################
#   Install RVM, Ruby, and default packages   #
###############################################

ENV RVM_ROOT=$HOME/.rvm/
ENV PATH="$RVM_ROOT/bin:$PATH"

RUN command curl -sSL https://rvm.io/mpapis.asc | gpg --import - && \
    command curl -sSL https://rvm.io/pkuczynski.asc | gpg --import - && \
    curl -sSL https://get.rvm.io | bash -s stable

RUN echo \
'bundler\n'\
'jekyll\n'\
'jekyll-sass-converter'\
> $RVM_ROOT/gemsets/default.gems

RUN chown amplify:amplify $RVM_ROOT/gemsets/default.gems

RUN rvm install 3.0.6 && \
    rvm install 3.1.4 && \
    rvm install 3.2.2 --default && \
    rvm cleanup all

ENV PATH="$HOME/bin:$PATH"
RUN echo 'export PATH="$PATH"' >> $HOME/.bashrc
ENTRYPOINT [ "bash", "-c" ]
